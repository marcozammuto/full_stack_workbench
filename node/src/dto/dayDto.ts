import type { Day } from "../types/entities.js";

export interface DayResponseDto {
  date: string;
  isWorkingDay: boolean;
  notes: string;
  startedAt: number;
  endedAt: number;
}

export const toDayDto = (day: Day) => ({
  date: day.date.toLocaleDateString("it-IT"),
  isWorkingDay: day.isWorkingDay,
  notes: day.notes,
  startedAt: day.startedAt,
  endedAt: day.endedAt,
});
