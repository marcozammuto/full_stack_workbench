import { NextFunction, Response, Request } from "express";
import { NODE_ENV_ENUM, RESPONSE_MESSAGES } from "../types/constants.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  // Handle the error here
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === NODE_ENV_ENUM.PROD
          ? RESPONSE_MESSAGES.ERROR_GENERAL
          : err.message,
    });
};
export { errorHandler };
