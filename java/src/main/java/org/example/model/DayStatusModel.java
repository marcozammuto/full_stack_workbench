package org.example.model;
import jakarta.persistence.*;

@Entity
@Table(name="day_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DayStatusModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;
}