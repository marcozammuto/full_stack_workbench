package com.workinghours;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;

public class Day {

    private final LocalDate date;
    private final boolean isWorkingDay;
    private final LocalTime startTime;
    private final LocalTime endTime;
    private final String variationType;
    private final String notes;

    // GETTERS
    public LocalDate getDate(){
        return this.date;
    }

    public LocalTime getStartTime(){
        return this.startTime;
    }

    public LocalTime getEndTime(){
        return this.endTime;
    }

    public String getVariationType(){
        return this.variationType;
    }

    public  String getNotes(){
        return this.notes;
    }

    public boolean isWorkingDay(){
        return this.isWorkingDay;
    }

    // CONSTRUCTORS

    // empty
    public Day() {
        LocalDate date = LocalDate.now();
        this.date = date;
        boolean isWorkingDay = date.getDayOfWeek().getValue() < 6;
        this.isWorkingDay = isWorkingDay;
        this.notes = "";
        if (isWorkingDay){
            this.startTime = LocalTime.of(9,0);
            this.endTime = LocalTime.of(18,0);
            this.variationType = "STANDARD";
        } else {
            this.startTime = null;
            this.endTime = null;
            this.variationType = "WEEKEND";
        }
    }

    // non-working day
    public Day(LocalDate date, String variationType, String notes){
        this.date = date;
        this.startTime = null;
        this.endTime = null;
        this.isWorkingDay = false;
        this.variationType = variationType;
        this.notes = notes;
    }

    // working day
    public Day (LocalDate date, LocalTime startTime, LocalTime endTime, String variationType, String notes){

        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        if (startTime == null || endTime == null) {
            throw new IllegalArgumentException("Working day must have start and end time");
        }

        if (startTime.isAfter(endTime)) {
            throw new IllegalArgumentException("Start time cannot be after end time");
        }

        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.variationType = variationType;
        this.notes = notes;
        this.isWorkingDay = true;
    }

    public boolean isWeekend(){
        return this.date.getDayOfWeek().getValue() >= 6;
    }

    /**
     * It calculates net worked hour with 1 hr lunch break
     *
     * @return Net worked hours (gross hours - 1h lunch), rounded to 2 decimals
     **/
    public double getWorkedTime() {

        if (!isWorkingDay || startTime == null || endTime == null) {
            return 0.0;
        }

        Duration duration = Duration.between(this.startTime, this.endTime);
        double hours = duration.toMinutes() / 60.0;
        double hoursWithLunch = hours - 1.0; // Italian law: mandatory 1h lunch break
        return Math.round(hoursWithLunch * 100.0) / 100.0;
    }

    @Override
    public String toString() {
        if (isWorkingDay) {
            return String.format("Day{date=%s, working=true, %s-%s, hours=%.2f, type=%s}",
                    date, startTime, endTime, getWorkedTime(), variationType);
        } else {
            return String.format("Day{date=%s, working=false, type=%s}",
                    date, variationType);
        }
    }
}
