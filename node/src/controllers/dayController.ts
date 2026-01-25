import { NextFunction, Response, Request } from "express";
import prisma from "../db/db.js";
import { Day } from "../services/dayService.js";
import { RESPONSE_MESSAGES } from "../types/constants.js";
import { splitDate } from "../utils/strings.js";
import { toDayDto } from "../dto/dayDto.js";

export const getAllDays = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const user = await prisma.user.findUnique({
    where: {
      code: req.user.code,
    },
  });

  if (user === null) {
    return res
      .status(404)
      .json({ message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND });
  }

  const days = await prisma.day.findMany({
    where: {
      userId: user.id,
    },
  });

  if (days.length === 0) {
    return res.status(200).json({ message: RESPONSE_MESSAGES.DAY_EMPTY });
  } else {
    return res.status(200).json({ data: days.map(toDayDto) });
  }
};
export const createDay = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await prisma.user.findUnique({
    where: {
      code: req.user.code,
    },
  });

  if (user === null) {
    return next({
      status: 500,
      message: RESPONSE_MESSAGES.ERROR_USER_NOT_FOUND,
    });
  }

  const existingDay = await prisma.day.findFirst({
    where: {
      userId: user.id,
      date: new Date(),
    },
  });

  if (
    existingDay !== null &&
    splitDate(existingDay.date) === splitDate(new Date())
  ) {
    return res
      .status(200)
      .json({ message: RESPONSE_MESSAGES.DAY_ALREADY_UPDATED });
  }

  const { startedAt, endedAt, dayModifierCode, notes } = req.body;

  const dayModifierId = await prisma.dayModifier.findUnique({
    select: {
      id: true,
    },
    where: {
      code: dayModifierCode,
    },
  });

  if (dayModifierId === null) {
    return res.status(400).json({
      message: RESPONSE_MESSAGES.DAY_MODIFIER_NOT_FOUND,
    });
  }

  const day = new Day(notes, dayModifierId.id, user.id, startedAt, endedAt);

  await prisma.day.create({ data: day });

  return res.status(200).json({
    day: day,
    message: RESPONSE_MESSAGES.DAY_SUCCESS,
  });
};

export const updateDay = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(200).json({
    message: "updateDay",
  });
};
export const checkCalendarUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(200).json({
    message: "checkCalendarUpdate",
  });
};
