package com.workinghours;

import java.time.LocalDate;
import java.util.List;

public final class FeedbackMessages {

    private FeedbackMessages(){
    }

    public static final String CSV_HEADER_ATTACHED = "Header successfully attached!";
    public static final String CSV_ENTRY_EXISTS = "⚠ Entry for already exists. Skipping.";
    public static final String CSV_ENTRY_SUCCESS = "✓ Successfully added entry";

    public static final String SCANNER_QUESTION_1 = "Hi, what would you like to do?";
    public static final String[] SCANNER_QUESTION_2 = {
            "Add today row",
            "Check current month file",
            String.format("Check %s csv file", LocalDate.now().getYear()),
            "Check another .csv file"
    };

    public static final String[] SCANNER_DESCRIPTION_1 = {
       "Something particular to report?",
          String.format("Checking %s month file", LocalDate.now().getYear()),
          String.format("Checking %s .csv file", LocalDate.now().getYear()),
            "Type the year you want to check"
    };

    public static final String SCANNER_ERROR_GENERAL = "Invalid answer, try again";

}
