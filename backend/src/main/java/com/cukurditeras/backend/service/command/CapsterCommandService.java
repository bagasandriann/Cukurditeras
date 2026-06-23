package com.cukurditeras.backend.service.command;

import com.cukurditeras.backend.domain.entity.Capster;
import com.cukurditeras.backend.repository.CapsterRepository;
import com.cukurditeras.backend.web.dto.request.CapsterLoginRequest;
import com.cukurditeras.backend.web.dto.request.CapsterRegisterRequest;
import com.cukurditeras.backend.web.dto.response.CapsterResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CapsterCommandService {

    private final CapsterRepository capsterRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CapsterResponse capsterRegister(CapsterRegisterRequest capsterRegisterRequest){
        Optional<Capster> capster = capsterRepository.findByEmail(capsterRegisterRequest.email());

        if (capster.isPresent()){
            throw new IllegalArgumentException("Capster already exist");
        }

        Capster newCapster = new Capster();
        newCapster.setName(capsterRegisterRequest.name());
        newCapster.setEmail(capsterRegisterRequest.email());
        newCapster.setPasswordHash(passwordEncoder.encode(capsterRegisterRequest.password()));
        newCapster.setPhoneNumber(capsterRegisterRequest.phoneNumber());
        newCapster.setActive(true);

        Capster savedNewCapster = capsterRepository.save(newCapster);

        return toCapsterResponse(savedNewCapster);
    }

    @Transactional(readOnly = true)
    public Capster loginAndGetCapster(CapsterLoginRequest capsterLoginRequest) {
        Capster capster = capsterRepository.findByEmail(capsterLoginRequest.email()).orElseThrow(() -> new RuntimeException("Capster not found"));

        if (!passwordEncoder.matches(capsterLoginRequest.password(), capster.getPasswordHash())) {
            throw new IllegalArgumentException("Wrong capster password");
        }

        return capster;
    }

    public CapsterResponse toCapsterResponse(Capster capster) {
        return new CapsterResponse(
                capster.getId(),
                capster.getName(),
                capster.getEmail(),
                capster.getPhoneNumber(),
                capster.getActive()
        );
    }
}
