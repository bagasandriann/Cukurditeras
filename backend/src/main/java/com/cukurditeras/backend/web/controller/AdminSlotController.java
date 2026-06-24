package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.command.SlotCommandService;
import com.cukurditeras.backend.service.query.SlotQueryService;
import com.cukurditeras.backend.web.dto.request.CreateSlotRequest;
import com.cukurditeras.backend.web.dto.request.UpdateSlotRequest;
import com.cukurditeras.backend.web.dto.response.AvailableSlotResponse;
import com.cukurditeras.backend.web.dto.response.SlotResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/slots")
@RequiredArgsConstructor
public class AdminSlotController {

    private final SlotCommandService slotCommandService;
    private final SlotQueryService slotQueryService;

    @GetMapping("/week")
    public List<AvailableSlotResponse> getAllSlotByDate(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate
    ) {
        return slotQueryService.findSlotByDateBetween(startDate, endDate);
    }

    @PostMapping
    public SlotResponse createSlot(@Valid @RequestBody CreateSlotRequest request){
        return slotCommandService.createNewSlot(request);
    }

    @PatchMapping("/{slotId}")
    public SlotResponse updateSlot(
            @PathVariable UUID slotId,
            @Valid @RequestBody UpdateSlotRequest updateSlotRequest
    ){
        return slotCommandService.updateSlot(slotId, updateSlotRequest);
    }

    @PostMapping("/{slotId}/cancel")
    public SlotResponse cancelSlot(@PathVariable UUID slotId){
        return slotCommandService.cancelSlot(slotId);
    }
}
