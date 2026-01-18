import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../types/constants.js";

export const hashPassword = async (plain: string): Promise<string> => {
  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  return hash;
};

export const isMatch = async (plain: string, hash: string): Promise<boolean> =>
  bcrypt.compareSync(plain, hash);

export const generateRecoveryToken = async (): Promise<{
  plain: string;
  hash: string;
}> => {
  const plain = crypto.randomUUID();
  const hash = await bcrypt.hash(plain, SALT_ROUNDS);
  return { plain, hash };
};
