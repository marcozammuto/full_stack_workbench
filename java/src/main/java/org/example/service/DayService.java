package service;

import org.example.model.DayModel;
import repository.DayRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DayService {
    private final DayRepository dayRepository;

    public DayService(DayRepository dayRepository) {
        this.dayRepository = dayRepository;
    }

    public List<DayModel> getAllDays() {
        return dayRepository.findAll();
    }
}
