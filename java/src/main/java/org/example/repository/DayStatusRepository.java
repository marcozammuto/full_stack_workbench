package repository;

import org.example.model.DayStatusModel;
import org.springframework.data.jpa.repository.JpaRepository;

interface DayStatusRepository extends JpaRepository<DayStatusModel, Long>{}