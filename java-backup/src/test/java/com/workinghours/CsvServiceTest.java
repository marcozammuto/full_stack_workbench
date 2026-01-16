package com.workinghours;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.junit.jupiter.params.shadow.com.univocity.parsers.csv.Csv;
import org.junit.jupiter.params.shadow.com.univocity.parsers.csv.CsvFormat;
import org.junit.jupiter.params.shadow.com.univocity.parsers.csv.CsvParser;

import static org.junit.jupiter.api.Assertions.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

public class CsvServiceTest {

    @TempDir
    Path tempDir;

    private Path getTestFilePath(){
        String filename = String.valueOf(LocalDate.now().getYear()) + ".csv";
        return tempDir.resolve(filename);
    }

    @Test
    public void shouldCreateFileWithHeaders() throws IOException {
        // ARRANGE
        Path testFile = getTestFilePath();
        Files.createFile(testFile);
        // ACT
        CsvService.setCsvHeaders(testFile);
        //ASSERT
        assertTrue(Files.exists(testFile), "File should exist");
    };

    @Test
     public void shouldNotDuplicateRows() throws IOException {
         // ARRANGE
         Path testFile = getTestFilePath();
         Files.createFile(testFile);
         CsvService.setCsvHeaders(testFile);
         CsvService.updateCsvFile(testFile, new Day());

         // ACT
         CsvService.updateCsvFile(testFile, new Day());
         Path file = Paths.get(testFile.toString());
         List<String> lines = Files.readAllLines(file);

         //ASSERT
        assertEquals(2, lines.size());
    }

    @Test
    public void shouldDetectExistingEntry() throws IOException{
        // ARRANGE
        Day day = new Day();
        Path path = getTestFilePath();
        CsvService.setCsvHeaders(path);
        // ACT
        CsvService.updateCsvFile(path,day);
        // ASSERT
        assertTrue(CsvService.hasEntryForDate(path, day.getDate()));
    }

    @Test
     public void shouldNotDetectMissingEntry() throws IOException{
        // ARRANGE
        Path path = getTestFilePath();
        Files.createFile(path);
        Day today = new Day();
        Day tomorrow = new Day(today.getDate().plusDays(1), "/", "");
        // ACT
        CsvService.setCsvHeaders(path);
        CsvService.updateCsvFile(path, today);
        // ASSERT
        assertFalse(CsvService.hasEntryForDate(path, tomorrow.getDate()));
    };

    @Test
    public void shouldAppendWithoutOverwriting() throws IOException{
        // ARRANGE
        Path path = getTestFilePath();
        Files.createFile(path);
        Day today = new Day();
        Day yesterday = new Day(today.getDate().minusDays(1), "/", "");
        Day tomorrow = new Day(today.getDate().plusDays(1), "/", "");
        // ACT
        CsvService.setCsvHeaders(path);
        CsvService.updateCsvFile(path, yesterday);
        CsvService.updateCsvFile(path, today);
        CsvService.updateCsvFile(path, today);
        CsvService.updateCsvFile(path, tomorrow);
        // ASSERT
        Path file = Paths.get(path.toString());
        List<String> lines = Files.readAllLines(file);
        assertEquals(4, lines.size());
    };

    @Test
    public void shouldHandleEmptyNotes(){};


}

