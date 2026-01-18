import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { UserInterface } from "../types/entities.js";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(
    token,
    String(process.env.JWT_SECRET_KEY),
    (err: Error, user: UserInterface) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      return next();
    }
  );
};
