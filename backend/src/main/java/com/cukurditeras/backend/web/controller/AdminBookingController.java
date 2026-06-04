package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.query.BookingQueryService;
import com.cukurditeras.backend.web.dto.response.BookingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final BookingQueryService bookingQueryService;
    @GetMapping
    public List<BookingResponse> getBookings(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        if (date == null) {
            return bookingQueryService.findAllBookings();
        }

        return bookingQueryService.findBookingByDate(date);
    }
}
