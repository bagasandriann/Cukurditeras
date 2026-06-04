package com.cukurditeras.backend.web.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record CreateBookingRequest(
        @NotNull
        UUID slotId,
        @NotBlank
        @Size(max = 100)
        String customerName,
        @NotBlank
        @Size(max = 20)
        String customerPhone,
        @Size(max = 500)
        String notes
) {
}
