package org.example.model;
import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.*;

@Entity
@Table(name = "day")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    private DayStatusModel status;
}
