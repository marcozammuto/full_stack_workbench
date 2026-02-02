import { describe, it, expect } from "vitest";
import { hashPassword, isMatch, generateRecoveryToken } from "./authService.js";

describe("authService", () => {
  describe("hashPassword", () => {
    it("should return a valid bcrypt hash", async () => {
      const password = "testPassword123";
      const hash = await hashPassword(password);

      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.startsWith("$2b$")).toBe(true); // bcrypt hash prefix
    });

    it("should generate different hashes for same password", async () => {
      const password = "testPassword123";
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe("isMatch", () => {
    it("should return true for correct password", async () => {
      const password = "correctPassword";
      const hash = await hashPassword(password);

      const result = await isMatch(password, hash);
      expect(result).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const password = "correctPassword";
      const wrongPassword = "wrongPassword";
      const hash = await hashPassword(password);

      const result = await isMatch(wrongPassword, hash);
      expect(result).toBe(false);
    });
  });

  describe("generateRecoveryToken", () => {
    it("should return plain and hash tokens", async () => {
      const result = await generateRecoveryToken();

      expect(result).toHaveProperty("plain");
      expect(result).toHaveProperty("hash");
      expect(result.plain).toBeDefined();
      expect(result.hash).toBeDefined();
    });

    it("should generate a UUID as plain token", async () => {
      const result = await generateRecoveryToken();
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      expect(result.plain).toMatch(uuidRegex);
    });

    it("should hash the plain token correctly", async () => {
      const result = await generateRecoveryToken();

      const matches = await isMatch(result.plain, result.hash);
      expect(matches).toBe(true);
    });
  });
});