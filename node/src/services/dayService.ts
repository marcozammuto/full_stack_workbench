export class Day {
  date: Date;
  isWorkingDay: boolean;
  notes: string;
  dayModifierId: number;
  userId: number;
  startedAt: number;
  endedAt: number;

  // Normal signature with defaults
  constructor(
    notes: string,
    dayModifierId: number,
    userId: number,
    startedAt: number,
    endedAt: number,
  ) {
    this.date = new Date();
    this.isWorkingDay = ![0, 6].includes(new Date().getDay());
    this.notes = notes;
    this.dayModifierId = dayModifierId;
    this.userId = userId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
  }
}
