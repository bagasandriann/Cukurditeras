package com.cukurditeras.backend.web.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CapsterLoginRequest(
        @NotBlank
        @Email
        @Size
        String email,
        @NotNull
        String password
) {

}
