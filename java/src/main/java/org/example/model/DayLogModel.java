package org.example.model;
import jakarta.persistence.*;

@Entity
@Table(name = "day_log")
public class DayLogModel {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    private DayStatusModel status;

}