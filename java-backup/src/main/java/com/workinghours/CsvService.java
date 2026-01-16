package com.workinghours;
import java.io.*;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.csv.*;
/**
 * Service for managing CSV file operations for work hour tracking
 */
public class CsvService {

    private static final String CSV_DIRECTORY = "src/main/resources/working_hours";

    public static Path getCsvFilePath(int year) throws IOException {
        // records are grouped by year
        String filename = year + ".csv";
        // build file path and create directories if not exist
        Path filePath = Paths.get(CSV_DIRECTORY, filename);
        Files.createDirectories(filePath.getParent());
        if (Files.notExists(filePath)) {
            Files.createFile(filePath);
            setCsvHeaders(filePath);
        }
        return filePath;
    }

    public static Path getCurrentYearCsvFile() throws  IOException {
        return getCsvFilePath(LocalDate.now().getYear());
    }

    public static void setCsvHeaders(Path path) throws IOException{
        try (BufferedWriter writer = Files.newBufferedWriter(path); CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            csvPrinter.printRecord("date", "start_time", "end_time", "hours_worked", "variation_type", "notes" );
        }
        System.out.println(FeedbackMessages.CSV_HEADER_ATTACHED);
    }

    public static boolean hasEntryForDate(Path path, LocalDate date) throws FileNotFoundException, IOException {
        try (BufferedReader reader = Files.newBufferedReader(path); CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader())) {
            for (CSVRecord record: parser){
                String dateStr =  record.get("date");
                if (dateStr.equals(date.toString())){
                    return true;
                }
            }
            return false;
        }
    }

    private static void addDay(Path path, Day day) throws IOException {

        String parsedStartTime = day.getStartTime() != null ? String.valueOf(day.getStartTime()) : "";
        String parsedEndTime = day.getEndTime() != null? String.valueOf(day.getEndTime()) : "";
        try (BufferedWriter writer = Files.newBufferedWriter(path, StandardOpenOption.APPEND); CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT)){
            csvPrinter.printRecord(day.getDate().toString(), parsedStartTime, parsedEndTime, String.valueOf(day.getWorkedTime()), day.getVariationType(), day.getNotes());
        }
    }

    public static void updateCsvFile(Path path, Day day) throws IOException {
        if (Files.exists(path)){
            if (hasEntryForDate(path, day.getDate())){
                System.out.println(FeedbackMessages.CSV_ENTRY_EXISTS);
                return;
            };
            addDay(path, day);
            System.out.println(FeedbackMessages.CSV_ENTRY_SUCCESS);
        }
    }

    public static void readAllDays(String path) throws FileNotFoundException, IOException{
        Reader in = new FileReader(path);
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        for (CSVRecord record: records){
            System.out.println(record);
        }
    }

}
