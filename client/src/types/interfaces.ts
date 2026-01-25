import type { IconType } from "react-icons";

export interface UserInterface {
  email: string;
  password: string;
}

export interface LookupItemInterface {
  code: string;
  name: string;
}

export interface LookupInterface {
  holiday?: string;
  dayModifier: LookupItemInterface[];
}

export interface DayInterface {
  date: string;
  notes: string;
  startedAt: string;
  endedAt: string;
  dayModifierCode: string;
  isWorkingDay: boolean;
  createdAt?: Date;
}

export interface BackendInterface {
  name: string;
  endpoint: string;
  icon: IconType;
}
