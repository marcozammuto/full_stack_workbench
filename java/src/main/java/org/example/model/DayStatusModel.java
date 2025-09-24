package org.example.model;
import jakarta.persistence.*;

@Entity
@Table(name="day_status")
public class DayStatusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    public DayStatusModel(){}
    public DayStatusModel(Long id, String name){
        this.id = id;
        this.name = name;
    }
}