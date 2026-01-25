import { Request, Response, NextFunction } from "express";
import { getBookings, seedBookings } from "../services/dynamoDbService.js";
import { json } from "node:stream/consumers";

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { nextCursor } = req.body;
  const bookings = await getBookings(nextCursor || null);
  return res.status(200).json({
    data: bookings.data,
    nextCursor: bookings?.nextCursor,
  });
};

export const seedAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("A");
  const bookings = await seedBookings();
  console.log("b");

  return res.status(200).json({ bookings });
};
