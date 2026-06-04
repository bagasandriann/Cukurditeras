package com.cukurditeras.backend.service.command;

import com.cukurditeras.backend.domain.entity.Capster;
import com.cukurditeras.backend.domain.entity.Slot;
import com.cukurditeras.backend.domain.enums.SlotStatus;
import com.cukurditeras.backend.repository.CapsterRepository;
import com.cukurditeras.backend.repository.SlotRepository;
import com.cukurditeras.backend.web.dto.request.CreateSlotRequest;
import com.cukurditeras.backend.web.dto.response.SlotResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class SlotCommandService {
    private final SlotRepository slotRepository;
    private final CapsterRepository capsterRepository;

    @Transactional
    public SlotResponse creteNewSlot(CreateSlotRequest request) {
        // TODO: nanti diganti dengan capster yang login
        Capster capster = capsterRepository.findById(request.capsterId()).orElseThrow(() -> new RuntimeException("Capster not found"));

        if (request.date().isBefore(LocalDate.now())){
            throw new IllegalArgumentException("Date tidak bisa lebih kecil dari hari ini");
        }

        if (request.startTime().getMinute() != 0) {
            throw new IllegalArgumentException("Start time harus tepat di jam (menit harus 00)");
        }

        boolean slotArleadyExist = slotRepository.existsByCapsterIdAndDateAndStartTime(capster.getId(), request.date(), request.startTime());

        if (slotArleadyExist){
            throw new RuntimeException("Slot already exist");
        }

        Slot newSlot = new Slot();
        newSlot.setCapster(capster);
        newSlot.setDate(request.date());
        newSlot.setStartTime(request.startTime());
        newSlot.setEndTime(request.startTime().plusHours(1));
        newSlot.setStatus(SlotStatus.AVAILABLE);
        newSlot.setNotes(request.notes());

        Slot savedSlot = slotRepository.save(newSlot);

        return new SlotResponse(
                savedSlot.getId(),
                savedSlot.getDate(),
                savedSlot.getStartTime(),
                savedSlot.getEndTime(),
                savedSlot.getStatus(),
                savedSlot.getNotes()
        );
    }
}
