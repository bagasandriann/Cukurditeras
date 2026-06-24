package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.domain.entity.Capster;
import com.cukurditeras.backend.security.JwtService;
import com.cukurditeras.backend.service.command.CapsterCommandService;
import com.cukurditeras.backend.web.dto.request.CapsterLoginRequest;
import com.cukurditeras.backend.web.dto.request.CapsterRegisterRequest;
import com.cukurditeras.backend.web.dto.response.CapsterResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final CapsterCommandService capsterCommandService;
    private final JwtService jwtService;

    @Value("${app.jwt.cookie-name}")
    private String jwtCookieName;

    @Value("${app.jwt.expiration-minutes}")
    private long jwtExpirationMinutes;

    @PostMapping("/login")
    public CapsterResponse loginCapster(
            @Valid @RequestBody
            CapsterLoginRequest capsterLoginRequest,
            HttpServletResponse response
    ) {
        Capster capster = capsterCommandService.loginAndGetCapster(capsterLoginRequest);

        String token = jwtService.generateCapsterToken(capster);

        ResponseCookie cookie = ResponseCookie.from(jwtCookieName, token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMinutes(jwtExpirationMinutes))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return capsterCommandService.toCapsterResponse(capster);
    }

    @PostMapping("/register")
    public CapsterResponse registerCapster(
            @Valid @RequestBody
            CapsterRegisterRequest capsterRegisterRequest
    ){
        return capsterCommandService.capsterRegister(capsterRegisterRequest);
    }

    @PostMapping("/logout")
    public void logoutCapster(HttpServletResponse response){
        ResponseCookie cookie = ResponseCookie.from(jwtCookieName, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
