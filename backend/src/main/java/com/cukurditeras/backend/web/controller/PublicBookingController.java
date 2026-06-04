package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.command.BookingCommandService;
import com.cukurditeras.backend.service.query.BookingQueryService;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import com.cukurditeras.backend.web.dto.request.CreateBookingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/bookings")
@RequiredArgsConstructor
public class PublicBookingController {

    private final BookingCommandService bookingCommandService;
    private final BookingQueryService bookingQueryService;

    @PostMapping
    public BookingResponse createBooking(@Valid @RequestBody CreateBookingRequest request) {
        return bookingCommandService.createNewBooking(request);
    }

    @GetMapping("/booking-code")
    public BookingResponse bookingResponseByBookingCode(
            @RequestParam
            String bookingCode
    ) {
        return bookingQueryService.findByBookingCode(bookingCode);
    }

    @PostMapping("/{bookingCode}/cancel")
    public BookingResponse cancelBooking(
            @PathVariable
            String bookingCode,
            @RequestParam
            String notes
    ) {
        return bookingCommandService.cancelBooking(bookingCode, notes);
    }
}
