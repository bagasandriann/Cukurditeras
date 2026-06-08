package com.cukurditeras.backend.service.command;

import com.cukurditeras.backend.domain.entity.Capster;
import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import com.cukurditeras.backend.repository.CapsterRepository;
import com.cukurditeras.backend.repository.SlotRepository;
import com.cukurditeras.backend.web.dto.request.CreateSlotRequest;
import com.cukurditeras.backend.web.dto.request.UpdateSlotRequest;
import com.cukurditeras.backend.web.dto.response.SlotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SlotCommandService {
    private final SlotRepository slotRepository;
    private final CapsterRepository capsterRepository;

    @Transactional
    public SlotResponse createNewSlot(CreateSlotRequest request) {
        // TODO: nanti diganti dengan capster yang login
        Capster capster = capsterRepository.findById(request.capsterId()).orElseThrow(() -> new RuntimeException("Capster not found"));

        validateSlotDateAndStartTime(request.date(), request.startTime());

        boolean slotAlreadyExist = slotRepository.existsByCapsterIdAndDateAndStartTime(capster.getId(), request.date(), request.startTime());

        if (slotAlreadyExist) {
            throw new RuntimeException("Slot already exist");
        }

        Slot newSlot = new Slot();
        newSlot.setCapster(capster);
        newSlot.setDate(request.date());
        newSlot.setStartTime(request.startTime());
        newSlot.setEndTime(request.startTime().plusHours(1));
        newSlot.setStatus(SlotStatus.AVAILABLE);
        newSlot.setNotes(request.notes());

        Slot savedSlot = slotRepository
                .save(newSlot);

        return toResponse(savedSlot);
    }


    @Transactional
    public SlotResponse updateSlot(UUID slotId, UpdateSlotRequest request) {
        Slot slot = slotRepository.findById(slotId).orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() == SlotStatus.BOOKED) {
            throw new IllegalArgumentException("You cannot edit a slot that has already been booked");
        }

        if (LocalDateTime.now().isAfter(LocalDateTime.of(slot.getDate(), slot.getStartTime()))) {
            throw new IllegalArgumentException("You cannot edit passed slot time");
        }

        validateSlotDateAndStartTime(request.date(), request.startTime());

        boolean slotAlreadyExist = slotRepository.existsByCapsterIdAndDateAndStartTimeAndIdNot(
                slot.getCapster().getId(),
                request.date(),
                request.startTime(),
                slot.getId()
        );

        if (slotAlreadyExist) {
            throw new RuntimeException("Slot already exist");
        }

        slot.setDate(request.date());
        slot.setStartTime(request.startTime());
        slot.setEndTime(request.startTime().plusHours(1));
        slot.setNotes(request.notes());

        return toResponse(slot);
    }

    @Transactional
    public SlotResponse cancelSlot(UUID slotId){
        Slot slot = slotRepository.findById(slotId).orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.getStatus() == SlotStatus.BOOKED) {
            throw new IllegalArgumentException("You cannot cancel a slot that has already been booked");
        }

        if (LocalDateTime.now().isAfter(LocalDateTime.of(slot.getDate(), slot.getStartTime()))) {
            throw new IllegalArgumentException("You cannot cancel passed slot time");
        }

        slot.setStatus(SlotStatus.CLOSED);

        return toResponse(slot);
    }

    private void validateSlotDateAndStartTime(LocalDate date, LocalTime startTime) {
        if (date.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("The date cannot be earlier than today");
        }

        if (startTime.getMinute() != 0 || startTime.getSecond() != 0 || startTime.getNano() != 0) {
            throw new IllegalArgumentException("The start time must be on the hour (the minutes must be 00)");
        }
    }

    private SlotResponse toResponse(Slot slot) {
        return new SlotResponse(
                slot.getId(),
                slot.getDate(),
                slot.getStartTime(),
                slot.getEndTime(),
                slot.getStatus(),
                slot.getNotes()
        );
    }
}
