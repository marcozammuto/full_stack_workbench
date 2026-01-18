import { NextFunction, Response, Request } from "express";
export declare const getAllDays: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const createDay: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const updateDay: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
export declare const checkCalendarUpdate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
