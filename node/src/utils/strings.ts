import { RESPONSE_MESSAGES } from "../types/constants.js";

// Converts "09:00" to 540 (minutes from midnight)
export const timeToMinutes = (time: string): number => {
  const parts = time.split(":").map(Number);
  const hours = parts[0] ?? 0;
  const minutes = parts[1] ?? 0;
  return hours * 60 + minutes;
};

export const splitDate = (stringDate: Date): string => {
  const isoString = stringDate.toISOString();
  if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(isoString)) {
    let sect: string | undefined = isoString.split("T")[0];
    if (!sect || sect === undefined) {
      throw new Error(RESPONSE_MESSAGES.FORMAT_ERROR_DATE);
    }
    return sect;
  } else {
    throw new Error(RESPONSE_MESSAGES.FORMAT_ERROR_DATE);
  }
};
