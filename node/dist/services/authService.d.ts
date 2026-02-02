/**
 * Authentication Service
 * Handles password hashing and verification using bcrypt
 */
/**
 * Hashes a plain text password using bcrypt
 * @param plain - The plain text password to hash
 * @returns The hashed password string
 */
export declare const hashPassword: (plain: string) => Promise<string>;
/**
 * Compares a plain text password against a hashed password
 * @param plain - The plain text password to verify
 * @param hash - The hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export declare const isMatch: (plain: string, hash: string) => Promise<boolean>;
/**
 * Generates a secure password recovery token
 * @returns Object containing both the plain token (to send to user) and its hash (to store in DB)
 */
export declare const generateRecoveryToken: () => Promise<{
    plain: string;
    hash: string;
}>;
