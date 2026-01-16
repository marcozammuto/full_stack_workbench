package com.workinghours;

import java.io.IOException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

public class ScannerService {

    public static int parseTimeInput (Scanner scanner, String question, String errorFeedback) {
        System.out.println(question);
        String userChoice = scanner.nextLine();
        int parsedChoice;
        try {
            parsedChoice = Integer.parseInt(userChoice);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(errorFeedback);
        }
        return  parsedChoice;
    }

    public static void updateCsvFromUserInput(Scanner scanner) throws IOException {
        Path file = CsvService.getCurrentYearCsvFile();
        LocalDate localDate = LocalDate.now();
        Day day;
        if (localDate.getDayOfWeek().getValue() >= 6) {
            day = new Day(localDate, "WEEKEND", "");
        } else {
            System.out.println("At what time did you start working? Do not type anything for 9.00");
            String startTimeStr = scanner.nextLine();
            int startTime;

            try {
                startTime = Integer.parseInt(startTimeStr);
            } catch (IllegalArgumentException iae) {
                System.out.println("You should provide a number");
                return;
            }

            if (startTimeStr.isEmpty()) {
                startTime = 9;
            }


            System.out.println("At what time did you stop working? Do not type anything for 18.00");
            String endTimeStr = scanner.nextLine();
            int endTime;

            try {
                endTime = Integer.parseInt(endTimeStr);
            } catch (IllegalArgumentException iae) {
                System.out.println("You should provide a number");
                return;
            }

            if (startTimeStr.isEmpty()){
                endTime = 9;
            }

            if (startTime != 9.00 || endTime != 18.00) {
                System.out.println("It seems you");
            }

            day = new Day(localDate, LocalTime.of(startTime, 0), LocalTime.of(endTime, 0), "/", "" );
        }

        // code block
        CsvService.updateCsvFile(file, day);
    }
}
