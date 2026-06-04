package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.BookingService;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import com.cukurditeras.backend.web.dto.request.CreateBookingRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/bookings")
@RequiredArgsConstructor
public class PublicBookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(@Valid @RequestBody CreateBookingRequest request){
        return bookingService.createNewBooking(request);
    }
}
