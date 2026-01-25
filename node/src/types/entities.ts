export interface UserInterface {
  email: string;
  code: string;
  id?: number;
  hash?: string;
}

export interface Day {
  id: number;
  userId: number;
  date: Date;
  createdAt: Date;
  isWorkingDay: boolean;
  notes: string;
  dayModifierId: number;
  startedAt: number;
  endedAt: number;
}
