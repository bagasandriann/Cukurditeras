package com.cukurditeras.backend.service;

import com.cukurditeras.backend.domain.entity.Booking;
import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.BookingStatus;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import com.cukurditeras.backend.repository.BookingRepository;
import com.cukurditeras.backend.repository.SlotRepository;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import com.cukurditeras.backend.web.dto.request.CreateBookingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.OffsetDateTime;
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

    @Transactional
    public BookingResponse findByBookingCode(String bookingCode) {
        Booking booking = bookingRepository.findByBookingCode(bookingCode)
                .orElseThrow(() -> new RuntimeException("Booking slot not found"));

        return toBookingResponse(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(String bookingCode, String notes) {
        Booking booking = bookingRepository.findByBookingCode(bookingCode)
                .orElseThrow(() -> new RuntimeException("Booking slot not found"));

        if (booking.getStatus() == BookingStatus.CANCELLED){
            throw new IllegalArgumentException("Booking has cancelled");
        }

        Slot slot = slotRepository.findById(booking.getSlot().getId()).orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() != SlotStatus.BOOKED) {
            throw new RuntimeException("Slot still available");
        }

        if (LocalTime.now().isAfter(slot.getStartTime())) {
            throw new IllegalArgumentException("You cannot cancel passed slot time");
        }

        if (LocalDate.now().isAfter(slot.getDate())){
            throw new IllegalArgumentException("You cannot cancel passed slot time");
        }

        if (LocalTime.now().isAfter(slot.getStartTime().minusHours(1))){
            throw new IllegalArgumentException("You cannot cancel 1 hour before the slot");
        }

        slot.setStatus(SlotStatus.AVAILABLE);
        booking.setStatus(BookingStatus.CANCELLED);
        booking.setCancelledAt(OffsetDateTime.now());
        booking.setNotes(notes);

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
