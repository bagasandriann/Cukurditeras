package com.cukurditeras.backend.security;

import com.cukurditeras.backend.domain.entity.Capster;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration-minutes}")
    private long expirationMinutes;

    public String generateCapsterToken(Capster capster){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationMinutes * 60 * 1000);

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .subject(capster.getId().toString())
                .claim("email", capster.getEmail())
                .claim("name", capster.getName())
                .issuedAt(now)
                .expiration(expiration)
                .signWith(key)
                .compact();
    }
}
