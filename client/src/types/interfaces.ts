import type { IconType } from "react-icons";

export type ReducerAction = {
  type: string;
  key: string;
  value: string;
};

export type InputType = "string" | "email" | "tel" | "number";

export interface FieldInterface {
  field: string;
  placeholder: string;
  label: string;
  type?: InputType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

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
