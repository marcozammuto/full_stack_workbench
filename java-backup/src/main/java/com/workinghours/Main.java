package com.workinghours;
import java.io.IOException;
import java.nio.file.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Scanner;

import static com.workinghours.ScannerService.updateCsvFromUserInput;

public class Main {
    public static void  main(String[] args) throws IOException {
        Scanner scanner = new Scanner(System.in);
        while (true){
            System.out.println(FeedbackMessages.SCANNER_QUESTION_1);
            int choiceCounter = 1;
            for (String choice: FeedbackMessages.SCANNER_QUESTION_2){
                System.out.println(choiceCounter + ") " + choice + ";" );
                choiceCounter++;
            }
            int input = Integer.parseInt(scanner.nextLine());
            try {
                if (input <= FeedbackMessages.SCANNER_QUESTION_2.length){
                    System.out.println(FeedbackMessages.SCANNER_DESCRIPTION_1[input - 1]);
                    switch(input) {
                        case 1:
                            updateCsvFromUserInput(scanner);
                            break;
                        case 2:
                            // TODO: implement
                            System.out.println("Feature 2 not implemented yet");
                            break;
                        case 3:
                            // TODO: implement
                            System.out.println("Feature 3 not implemented yet");
                            break;
                        case 4:
                            // TODO: implement
                            System.out.println("Feature 4 not implemented yet");
                            break;
                        default:
                            // TODO: implement
                            System.out.println("Feature default not implemented yet");
                            break;
                    }
                }
            } catch(NumberFormatException e){
                System.out.println(FeedbackMessages.SCANNER_ERROR_GENERAL);
            }
        }

    }
}
