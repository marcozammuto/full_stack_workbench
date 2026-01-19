import { NextFunction, Response, Request } from "express";
import prisma from "../db/db.js";
import { RESPONSE_MESSAGES } from "../types/constants.js";

export const getAllLookupData = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const dayModifier = await prisma.dayModifier.findMany();

  if (dayModifier === null) {
    return res
      .status(404)
      .json({ message: RESPONSE_MESSAGES.ERROR_LOOKUP_NOT_FOUND });
  }

  return res.status(200).json({
    data: {
      dayModifier,
    },
  });
};
