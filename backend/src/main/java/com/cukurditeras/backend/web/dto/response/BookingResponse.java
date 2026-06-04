package com.cukurditeras.backend.web.dto.response;

import com.cukurditeras.backend.domain.enums.BookingStatus;

import java.time.OffsetDateTime;
import java.util.UUID;

public record BookingResponse(
        UUID id,
        String bookingCode,
        String customerName,
        String customerPhone,
        OffsetDateTime createdAt,
        BookingStatus status
) {
}
