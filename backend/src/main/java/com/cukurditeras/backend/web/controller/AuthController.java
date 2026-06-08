package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.command.CapsterCommandService;
import com.cukurditeras.backend.web.dto.request.CapsterLoginRequest;
import com.cukurditeras.backend.web.dto.request.CapsterRegisterRequest;
import com.cukurditeras.backend.web.dto.response.CapsterResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final CapsterCommandService capsterCommandService;

    @PostMapping("/login")
    public CapsterResponse loginCapster(
            @Valid @RequestBody
            CapsterLoginRequest capsterLoginRequest
    ) {
        return capsterCommandService.capsterLogin(capsterLoginRequest);
    }

    @PostMapping("/register")
    public CapsterResponse registerCapster(
            @Valid @RequestBody
            CapsterRegisterRequest capsterRegisterRequest
    ){
        return capsterCommandService.capsterRegister(capsterRegisterRequest);
    }
}
