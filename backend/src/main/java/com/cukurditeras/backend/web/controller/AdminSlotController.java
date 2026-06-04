package com.cukurditeras.backend.web.controller;

import com.cukurditeras.backend.service.SlotCommandService;
import com.cukurditeras.backend.web.dto.request.CreateSlotRequest;
import com.cukurditeras.backend.web.dto.response.SlotResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/slots")
@RequiredArgsConstructor
public class AdminSlotController {

    private final SlotCommandService slotCommandService;

    @PostMapping
    public SlotResponse createSlot(@Valid @RequestBody CreateSlotRequest request){
        return  slotCommandService.creteNewSlot(request);
    }
}
