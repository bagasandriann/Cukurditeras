package com.cukurditeras.backend.repository;

import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

public interface SlotRepository extends JpaRepository<Slot, UUID> {
    List<Slot> findByDateAndStatusOrderByStartTimeAsc(LocalDate date, SlotStatus status);
    List<Slot> findByDateBetweenAndStatusOrderByDateAscStartTimeAsc(LocalDate startDate, LocalDate endDate, SlotStatus status);
    boolean existsByCapsterIdAndDateAndStartTime(UUID capsterId, LocalDate date, LocalTime startTime);
    boolean existsByCapsterIdAndDateAndStartTimeAndIdNot(UUID capsterId, LocalDate date, LocalTime startTime, UUID id);
}
