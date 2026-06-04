package com.cukurditeras.backend.web.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record CreateSlotRequest(
        @NotNull
        UUID capsterId,
        @NotNull
        LocalDate date,
        @NotNull
        LocalTime startTime,
        @Size(max = 500)
        String notes
) {
}
