package com.cukurditeras.backend.service;

import com.cukurditeras.backend.domain.entity.Booking;
import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.BookingStatus;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import com.cukurditeras.backend.repository.BookingRepository;
import com.cukurditeras.backend.repository.SlotRepository;
import com.cukurditeras.backend.web.dto.response.AvailableSlotResponse;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import com.cukurditeras.backend.web.dto.request.CreateBookingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    @Transactional
    public BookingResponse createNewBooking(CreateBookingRequest request) {
        Slot slot = slotRepository.findById(request.slotId()).orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new RuntimeException("Slot not available");
        }

        boolean slotAlreadyBooked = bookingRepository.existsBySlotId(slot.getId());

        if (slotAlreadyBooked) {
            throw new RuntimeException("Slot already booked");
        }

        Booking newBooking = new Booking();
        newBooking.setSlot(slot);
        newBooking.setBookingCode(generateBookingCode(slot));
        newBooking.setStatus(BookingStatus.CONFIRMED);
        newBooking.setCustomerName(request.customerName());
        newBooking.setCustomerPhone(request.customerPhone());
        newBooking.setNotes(request.notes());
        slot.setStatus(SlotStatus.BOOKED);

        Booking savedBooking = bookingRepository.save(newBooking);

        return toBookingResponse(savedBooking);
    }

    @Transactional(readOnly = true)
    public BookingResponse findByBookingCode(String bookingCodeRequest) {
        Booking booking = bookingRepository.findByBookingCode(bookingCodeRequest)
                .orElseThrow(() -> new RuntimeException("Booking slot not found"));

        return toBookingResponse(booking);
    }

    private String generateBookingCode(Slot slot) {
        String availableSlotDate = slot.getDate().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String availableSlotTime = slot.getStartTime().format(DateTimeFormatter.ofPattern("HHmm"));
        return "CDT" + availableSlotDate + availableSlotTime;
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
