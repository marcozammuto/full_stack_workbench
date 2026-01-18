import { NextFunction, Response, Request } from "express";
import { getCurrentDay } from "../services/dayService.js";
import prisma from "../db/db.js";

export const getAllDays = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({
    message: "getAllDays",
  });
};
export const createDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await prisma.user.findUnique({
    where: {
      code: req.user.code,
    },
  });

  const day = getCurrentDay("", 1, user?.id);

  await prisma.day.create({ data: day });

  return res.status(200).json({
    day: day,
    message: "createDay",
  });
};
export const updateDay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({
    message: "updateDay",
  });
};
export const checkCalendarUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({
    message: "checkCalendarUpdate",
  });
};
