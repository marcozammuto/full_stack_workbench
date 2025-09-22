package org.example.controller;

import java.time.LocalDateTime;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/")
    public String main() {
        LocalDateTime localDateTime = LocalDateTime.now();
        return "OK " + localDateTime;
    }
}
