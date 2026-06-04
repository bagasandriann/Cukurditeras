package com.cukurditeras.backend.web.dto.response;

import com.cukurditeras.backend.domain.enums.SlotStatus;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record SlotResponse(
        UUID id,
        LocalDate date,
        LocalTime startTime,
        LocalTime endTime,
        SlotStatus status,
        String notes
) {
}
