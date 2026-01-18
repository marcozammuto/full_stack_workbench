import { NextFunction } from "express";
import jwt from "jsonwebtoken";

export const signToken = (user: {
  code: string;
  email: string;
}): {
  user: { code: string; email: string };
  token: string;
} => {
  const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

  if (!JWT_SECRET_KEY || !JWT_EXPIRES_IN) {
    throw new Error("JWT setup variables are missing");
  }

  const expiresIn = String(JWT_EXPIRES_IN) || "30m";

  const token = jwt.sign(
    { code: user.code, email: user.email },
    JWT_SECRET_KEY,
    {
      expiresIn: expiresIn,
    }
  );

  return { user, token: token };
};
