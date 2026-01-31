import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token.token;

  if (!token || token === undefined) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

    if (typeof decoded === "string" || !decoded.email || !decoded.code) {
      return next({ status: 401, message: "Invalid token payload" });
    }

    req.user = { email: decoded.email as string, code: decoded.code as string };
    next();
  } catch (err) {
    next({ status: 401, message: "Invalid token" });
  }
};
