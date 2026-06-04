package com.cukurditeras.backend.repository;

import com.cukurditeras.backend.domain.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookingRepository extends JpaRepository<Booking, UUID> {

    Optional<Booking> findByBookingCode(String bookingCode);
    List<Booking> findBySlotDateOrderBySlotStartTimeAsc(LocalDate date);
    boolean existsBySlotId(UUID slotId);
}
