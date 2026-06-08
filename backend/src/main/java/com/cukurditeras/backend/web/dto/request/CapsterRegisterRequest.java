package com.cukurditeras.backend.web.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;

public record CapsterRegisterRequest(
        @NotNull
        String name,
        @NotNull
        String email,
        @NotNull
        String password,
        @NotNull String phoneNumber
) {
}
