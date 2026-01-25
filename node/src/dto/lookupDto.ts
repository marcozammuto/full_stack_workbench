import { LookupInterface } from "../types/interfaces.js";

export const toLookupDto = (
  lookupWithId: LookupInterface & { id: number },
): LookupInterface => ({
  code: lookupWithId.code,
  name: lookupWithId.name,
});
