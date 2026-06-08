package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.command.SlotCommandService;
import com.cukurditeras.backend.web.dto.request.CreateSlotRequest;
import com.cukurditeras.backend.web.dto.request.UpdateSlotRequest;
import com.cukurditeras.backend.web.dto.response.SlotResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/slots")
@RequiredArgsConstructor
public class AdminSlotController {

    private final SlotCommandService slotCommandService;

    @PostMapping
    public SlotResponse createSlot(@Valid @RequestBody CreateSlotRequest request){
        return slotCommandService.createNewSlot(request);
    }

    @PatchMapping("/{id}")
    public SlotResponse updateSlot(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateSlotRequest updateSlotRequest
    ){
        return slotCommandService.updateSlot(id, updateSlotRequest);
    }
}
