package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.SlotQueryService;
import com.cukurditeras.backend.web.dto.response.AvailableSlotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/public/slots")
@RequiredArgsConstructor
public class PublicSlotController {

    private final SlotQueryService slotQueryService;

    @GetMapping
    public List<AvailableSlotResponse> getAvailableSlots(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate date
    ) {
        LocalDate queryDate = date != null ? date : LocalDate.now();
        return slotQueryService.findAvailableSlots(queryDate);
    }

    @GetMapping("/week")
    public List<AvailableSlotResponse> getAvailableSlotsInRange(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate
    ) {
        return slotQueryService.findAvailableSlotsBetween(startDate, endDate);
    }
}
