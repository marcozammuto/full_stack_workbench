package org.example.controller;

import org.example.model.*;
import java.time.LocalDate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DayController {
    @GetMapping("/day")
    public DayModel createDay(){
        LocalDate localDate = LocalDate.now();
        DayStatusModel status = new DayStatusModel(1L, "Active");
        DayModel dayModel = new DayModel(1L, localDate, status);
                return dayModel;
    };
}