package com.cukurditeras.backend.repository;

import com.cukurditeras.backend.domain.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    Optional<Booking> findByBookingCode(String bookingCode);

    boolean existsBySlotId(UUID slotId);
}
