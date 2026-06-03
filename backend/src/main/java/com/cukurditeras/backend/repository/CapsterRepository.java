package com.cukurditeras.backend.repository;

import com.cukurditeras.backend.domain.entity.Capster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CapsterRepository extends JpaRepository<Capster, UUID> {

    Optional<Capster> findByEmail(String email);
}
