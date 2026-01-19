import crypto from "crypto";
export const getRandomString = (length) => crypto.randomBytes(256).toString().slice(0, length);
//# sourceMappingURL=random.js.map