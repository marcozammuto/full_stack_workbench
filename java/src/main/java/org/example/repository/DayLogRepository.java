package repository;

import org.example.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DayLogRepository extends JpaRepository<DayLogModel, Long> {
}
