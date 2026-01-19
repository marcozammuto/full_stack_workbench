import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        code: string;
      };
    }
  }
}
