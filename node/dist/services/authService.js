import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../types/constants.js";
export const hashPassword = async (plain) => {
    const hash = await bcrypt.hash(plain, SALT_ROUNDS);
    return hash;
};
export const isMatch = async (plain, hash) => bcrypt.compareSync(plain, hash);
export const generateRecoveryToken = async () => {
    const plain = crypto.randomUUID();
    const hash = await bcrypt.hash(plain, SALT_ROUNDS);
    return { plain, hash };
};
//# sourceMappingURL=authService.js.map