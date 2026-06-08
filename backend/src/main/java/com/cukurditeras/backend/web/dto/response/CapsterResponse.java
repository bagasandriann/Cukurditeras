package com.cukurditeras.backend.web.dto.response;

import java.util.UUID;

public record CapsterResponse(
        UUID id,
        String name,
        String email,
        String phoneNumber,
        Boolean active
) {
}
