package org.example.controller;

import org.example.model.*;
import java.time.LocalDate;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DayController {

    @PostMapping("/day")
    public DayModel createDay(){
        LocalDate localDate = LocalDate.now();
        DayStatusModel status = new DayStatusModel(1L, "Active");
        DayModel dayModel = new DayModel(1, localDate, status);
                return dayModel;
    };
}