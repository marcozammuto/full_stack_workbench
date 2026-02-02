import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../types/constants.js";

/**
 * Authentication Service
 * Handles password hashing and verification using bcrypt
 */

/**
 * Hashes a plain text password using bcrypt
 * @param plain - The plain text password to hash
 * @returns The hashed password string
 */
export const hashPassword = async (plain: string): Promise<string> => {
  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  return hash;
};

/**
 * Compares a plain text password against a hashed password
 * @param plain - The plain text password to verify
 * @param hash - The hashed password to compare against
 * @returns True if passwords match, false otherwise
 */
export const isMatch = async (plain: string, hash: string): Promise<boolean> =>
  bcrypt.compareSync(plain, hash);

/**
 * Generates a secure password recovery token
 * @returns Object containing both the plain token (to send to user) and its hash (to store in DB)
 */
export const generateRecoveryToken = async (): Promise<{
  plain: string;
  hash: string;
}> => {
  const plain = crypto.randomUUID();
  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  return { plain, hash };
};
