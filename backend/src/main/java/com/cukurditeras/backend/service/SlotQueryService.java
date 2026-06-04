package com.cukurditeras.backend.service;

import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import com.cukurditeras.backend.repository.SlotRepository;
import com.cukurditeras.backend.web.dto.response.AvailableSlotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SlotQueryService {

    private final SlotRepository slotRepository;

    @Transactional(readOnly = true)
    public List<AvailableSlotResponse> findAvailableSlots(LocalDate date) {
        return slotRepository.findByDateAndStatusOrderByStartTimeAsc(date, SlotStatus.AVAILABLE)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AvailableSlotResponse toResponse(Slot slot) {
        return new AvailableSlotResponse(
                slot.getId(),
                slot.getStatus(),
                slot.getDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getCapster().getName(),
                slot.getNotes()
        );
    }
}
