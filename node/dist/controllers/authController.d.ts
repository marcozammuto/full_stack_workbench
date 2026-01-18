import { NextFunction, Request, Response } from "express";
export declare const handleSignup: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const handleLogin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const handleLogout: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const handleGetMe: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const issuePasswordChangeToken: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const handlePasswordChange: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
