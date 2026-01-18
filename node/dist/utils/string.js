import crypto from "crypto";
export const getRandomString = (length) => crypto.randomBytes(20).toString().slice(0, length);
//# sourceMappingURL=string.js.map