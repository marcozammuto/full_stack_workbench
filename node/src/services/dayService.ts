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

import { readFileSync } from "fs";
import path from "path";
import { FILE_ENUM, RESPONSE_MESSAGES } from "../types/constants.js";
import prisma from "../db/db.js";
import { toLookupDto } from "../dto/lookupDto.js";

export const getAllDayModifiers = async () => {
  const dayModifiers = await prisma.dayModifier.findMany();
  if (dayModifiers === null) {
    throw new Error(RESPONSE_MESSAGES.ERROR_LOOKUP_NOT_FOUND);
  }
  return dayModifiers.map((d) => toLookupDto(d));
};

export const getTodayHoliday = async () => {
  const isoCode: string = "IT";
  const today = new Date().toISOString().split("T")[0] as string;
  const endpoint = new URL(String(process.env.NATIONAL_HOLIDAYS_API_HOST));
  endpoint.searchParams.set("countryIsoCode", isoCode);
  endpoint.searchParams.set("languageIsoCode", isoCode);
  endpoint.searchParams.set("validFrom", today);
  endpoint.searchParams.set("validTo", today);

  const response = await fetch(endpoint);

  if (response.ok) {
    const data = await response.json();

    const name = data[0]?.name[0]?.text;
    if (name === undefined) {
      return null;
    }
    return name;
  }
};

export const retrieveDayModifierId = async (str: string): Promise<number> => {
  const lookupPath = path.resolve(
    "..",
    "lookup",
    FILE_ENUM.LOOKUP_DAY_MODIFIER,
  );

  const data = readFileSync(lookupPath, "utf8");

  const lookupData = JSON.parse(data);

  if (lookupData.length === 0) {
    throw new Error("Empty lookup data");
  }

  const match = lookupData.find(
    (lookup: { code: string; name: string }) => lookup.code === str,
  );

  if (match) {
    return match.code;
  } else {
    throw new Error(RESPONSE_MESSAGES.DAY_MODIFIER_NOT_FOUND);
  }
};
