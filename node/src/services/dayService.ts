class Day {
  date: Date;
  isWorkingDay: boolean;
  notes: string;
  dayModifierId: number;
  userId: number;
  workedHours: number;

  // Normal signature with defaults
  constructor(
    notes: string,
    dayModifierId: number,
    userId: number,
    workedHours: number
  ) {
    this.date = new Date();
    this.isWorkingDay = ![0, 6].includes(new Date().getDay());
    this.notes = notes;
    this.dayModifierId = dayModifierId;
    this.userId = userId;
    this.workedHours = workedHours;
  }
}

export const getCurrentDay = (
  notes: string,
  dayModifierId: number,
  userId: number
): Day => {
  const day = new Day(notes, dayModifierId, userId, 8);
  return day;
};
