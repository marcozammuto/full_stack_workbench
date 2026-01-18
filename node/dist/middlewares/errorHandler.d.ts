import { NextFunction, Response, Request } from "express";
declare const errorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => void;
export { errorHandler };
