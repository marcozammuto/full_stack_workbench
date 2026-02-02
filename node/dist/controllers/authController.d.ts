import { NextFunction, Request, Response } from "express";
/**
 * Authentication Controller
 * Handles user registration, login, logout, and password recovery
 */
/**
 * Handles user registration
 * @route POST /auth/signup
 * @returns 201 on success, 409 if email already exists
 */
export declare const handleSignup: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Handles user login and JWT token generation
 * @route POST /auth/login
 * @returns 200 with user data and sets HTTP-only cookie, 401 on invalid credentials
 */
export declare const handleLogin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Handles user logout by clearing the auth cookie
 * @route POST /auth/logout
 * @returns 200 on success
 */
export declare const handleLogout: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
/**
 * Returns the currently authenticated user's data
 * @route GET /auth/me
 * @returns 200 with user data, 404 if user not found
 */
export declare const handleGetMe: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Issues a password reset token and generates recovery URL
 * @route POST /auth/password/forgot
 * @returns 200 with recovery endpoint (always returns 200 to prevent email enumeration)
 */
export declare const issuePasswordChangeToken: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Handles password reset using a valid recovery token
 * @route POST /auth/password/reset
 * @query tkn - The recovery token sent to user's email
 * @query code - The user's unique code
 * @returns 200 on success, 500 on invalid token or user
 */
export declare const handlePasswordChange: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
