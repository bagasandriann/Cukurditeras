package com.cukurditeras.backend.web.dto.response;

import com.cukurditeras.backend.domain.enums.SlotStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record AvailableSlotResponse(
        UUID id,
        SlotStatus status,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        String capsterName,
        String notes
) {
}
