package repository;

import org.example.model.DayModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<DayModel, Long> {
}
