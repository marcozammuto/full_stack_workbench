import { NextFunction, Response, Request } from "express";
import { getAllDayModifiers, getTodayHoliday } from "../services/dayService.js";

export const getAllLookupData = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const [dayModifiers, holiday] = await Promise.all([
    getAllDayModifiers(),
    getTodayHoliday(),
  ]);

  return res.status(200).json({
    data: {
      dayModifiers,
      holiday,
    },
  });
};
