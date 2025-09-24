package org.example.model;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "day")
public class DayModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    private DayStatusModel status;

    public DayModel(){};

   public DayModel(Long id, LocalDate date, DayStatusModel status){
       this.id = id;
       this.date = date;
       this.status = status;
    }
}
