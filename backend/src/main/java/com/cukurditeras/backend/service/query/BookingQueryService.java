package com.cukurditeras.backend.service.query;

import com.cukurditeras.backend.domain.entity.Booking;
import com.cukurditeras.backend.repository.BookingRepository;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingQueryService {

    private final BookingRepository bookingRepository;
    @Transactional
    public BookingResponse findByBookingCode(String bookingCode) {
        Booking booking = bookingRepository.findByBookingCode(bookingCode)
                .orElseThrow(() -> new RuntimeException("Booking slot not found"));

        return toBookingResponse(booking);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> findBookingByDate(LocalDate date) {
        return bookingRepository.findBySlotDateOrderBySlotStartTimeAsc(date)
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> findAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::toBookingResponse)
                .toList();
    }

    private BookingResponse toBookingResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getBookingCode(),
                booking.getCustomerName(),
                booking.getCustomerPhone(),
                booking.getCreatedAt(),
                booking.getStatus(),
                booking.getNotes()
        );
    }
}
