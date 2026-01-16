package com.workinghours;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Test class for Day.
 *
 * This demonstrates the AAA pattern:
 * - Arrange: Set up test data
 * - Act: Call the method being tested
 * - Assert: Verify the result
 */
public class DayTest {

    /**
     * TEST 1: Working day should calculate hours correctly
     *
     * WHAT WE'RE TESTING: getWorkedTime() method
     * SCENARIO: 9:00 to 18:00 with 1-hour lunch break
     * EXPECTED: 8.0 hours (9 hours - 1 hour lunch)
     */
    @Test
    public void shouldCalculate8HoursForStandardWorkDay() {
        // ARRANGE - Set up test data
        LocalDate date = LocalDate.of(2026, 1, 15);  // Wednesday
        LocalTime start = LocalTime.of(9, 0);         // 09:00
        LocalTime end = LocalTime.of(18, 0);          // 18:00

        Day day = new Day(date, start, end, "STANDARD", null);

        // ACT - Call the method we're testing
        double hours = day.getWorkedTime();

        // ASSERT - Verify the result
        assertEquals(8.0, hours, 0.01, "9:00-18:00 should be 8 hours after lunch break");
    }

    /**
     * TEST 2: Weekend should return 0 hours
     *
     * WHAT WE'RE TESTING: getWorkedTime() for non-working days
     * SCENARIO: Weekend day (no work times)
     * EXPECTED: 0.0 hours
     */
    @Test
    public void shouldReturn0HoursForWeekend() {
        // ARRANGE
        LocalDate saturday = LocalDate.of(2026, 1, 17);  // Saturday
        Day weekend = new Day(saturday, "WEEKEND", null);

        // ACT
        double hours = weekend.getWorkedTime();

        // ASSERT
        assertEquals(0.0, hours, "Weekend should have 0 worked hours");
    }

    /**
     * TEST 3: Should correctly identify working days
     *
     * WHAT WE'RE TESTING: isWorkingDay() method
     * SCENARIO: Created a working day
     * EXPECTED: true
     */
    @Test
    public void shouldReturnTrueForWorkingDay() {
        // ARRANGE
        Day workDay = new Day(
            LocalDate.now(),
            LocalTime.of(9, 0),
            LocalTime.of(17, 0),
            "STANDARD",
            null
        );

        // ACT
        boolean isWorking = workDay.isWorkingDay();

        // ASSERT
        assertTrue(isWorking, "Day created with work times should be a working day");
    }

    /**
     * TEST 4: Should correctly identify non-working days
     */
    @Test
    public void shouldReturnFalseForNonWorkingDay() {
        // ARRANGE
        Day holiday = new Day(LocalDate.now(), "NATIONAL_HOLIDAY", "New Year");

        // ACT
        boolean isWorking = holiday.isWorkingDay();

        // ASSERT
        assertFalse(isWorking, "Holiday should not be a working day");
    }

    /**
     * TEST 5: Should throw exception for null date
     *
     * WHAT WE'RE TESTING: Constructor validation
     * SCENARIO: Pass null for required date parameter
     * EXPECTED: IllegalArgumentException thrown
     */
    @Test
    public void shouldThrowExceptionForNullDate() {
        // ARRANGE, ACT & ASSERT combined
        assertThrows(IllegalArgumentException.class, () -> {
            new Day(null, LocalTime.of(9, 0), LocalTime.of(17, 0), "STANDARD", null);
        }, "Constructor should reject null date");
    }

    /**
     * TEST 6: Should throw exception when start time is after end time
     */
    @Test
    public void shouldThrowExceptionWhenStartTimeAfterEndTime() {
        // ARRANGE
        LocalDate date = LocalDate.now();
        LocalTime start = LocalTime.of(18, 0);  // 18:00
        LocalTime end = LocalTime.of(9, 0);     // 09:00 (BEFORE start!)

        // ACT & ASSERT
        assertThrows(IllegalArgumentException.class, () -> {
            new Day(date, start, end, "STANDARD", null);
        }, "Constructor should reject start time after end time");
    }

    /**
     * TEST 7: Should correctly identify weekends
     */
    @Test
    public void shouldIdentifySaturdayAsWeekend() {
        // ARRANGE
        LocalDate saturday = LocalDate.of(2026, 1, 17);  // Known Saturday
        Day day = new Day(saturday, "WEEKEND", null);

        // ACT
        boolean isWeekend = day.isWeekend();

        // ASSERT
        assertTrue(isWeekend, "Saturday should be identified as weekend");
    }

    /**
     * TEST 8: Should NOT identify weekday as weekend
     */
    @Test
    public void shouldNotIdentifyMondayAsWeekend() {
        // ARRANGE
        LocalDate monday = LocalDate.of(2026, 1, 12);  // Known Monday
        Day day = new Day(monday, LocalTime.of(9, 0), LocalTime.of(17, 0), "STANDARD", null);

        // ACT
        boolean isWeekend = day.isWeekend();

        // ASSERT
        assertFalse(isWeekend, "Monday should NOT be weekend");
    }

    /**
     * TEST 9: Should handle partial hours correctly
     *
     * SCENARIO: 9:00 to 18:23 (9 hours 23 minutes = 9.383... hours)
     * After 1-hour lunch: 8.383... hours
     * Rounded to 2 decimals: 8.38 hours
     */
    @Test
    public void shouldCalculatePartialHoursCorrectly() {
        // ARRANGE
        Day day = new Day(
            LocalDate.now(),
            LocalTime.of(9, 0),    // 09:00
            LocalTime.of(18, 23),  // 18:23
            "STANDARD",
            null
        );

        // ACT
        double hours = day.getWorkedTime();

        // ASSERT
        assertEquals(8.38, hours, 0.01, "9:00-18:23 should be 8.38 hours");
    }

    /**
     * TEST 10: toString() should include relevant information
     */
    @Test
    public void toStringShouldContainDate() {
        // ARRANGE
        LocalDate date = LocalDate.of(2026, 1, 15);
        Day day = new Day(date, LocalTime.of(9, 0), LocalTime.of(17, 0), "STANDARD", null);

        // ACT
        String result = day.toString();

        // ASSERT
        assertTrue(result.contains("2026-01-15"), "toString should contain the date");
        assertTrue(result.contains("09:00"), "toString should contain start time");
        assertTrue(result.contains("17:00"), "toString should contain end time");
    }
}
