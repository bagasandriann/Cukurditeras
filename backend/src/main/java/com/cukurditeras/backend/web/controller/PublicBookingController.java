package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.BookingService;
import com.cukurditeras.backend.web.dto.response.AvailableSlotResponse;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import com.cukurditeras.backend.web.dto.request.CreateBookingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/public/bookings")
@RequiredArgsConstructor
public class PublicBookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(@Valid @RequestBody CreateBookingRequest request) {
        return bookingService.createNewBooking(request);
    }

    @GetMapping("/booking-code")
    public BookingResponse bookingResponseByBookingCode(
            @RequestParam
            String bookingCode
    ) {
        return bookingService.findByBookingCode(bookingCode);
    }

    @PostMapping("/{bookingCode}/cancel")
    public BookingResponse cancelBooking(
            @PathVariable
            String bookingCode,
            @RequestParam
            String notes
    ) {
        return bookingService.cancelBooking(bookingCode, notes);
    }
}
