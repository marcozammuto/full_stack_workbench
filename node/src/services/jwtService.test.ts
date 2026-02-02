import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import jwt from "jsonwebtoken";

describe("jwtService", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("signToken", () => {
    it("should return a valid JWT token", async () => {
      process.env.JWT_SECRET_KEY = "test-secret-key";
      process.env.JWT_EXPIRES_IN = "30m";

      const { signToken } = await import("./jwtService.js");

      const user = { email: "test@example.com", code: "abc123" };
      const result = signToken(user);

      expect(result).toHaveProperty("token");
      expect(result).toHaveProperty("user");
      expect(result.user).toEqual(user);

      // Verify the token is valid
      const decoded = jwt.verify(result.token, "test-secret-key") as {
        email: string;
        code: string;
      };
      expect(decoded.email).toBe(user.email);
      expect(decoded.code).toBe(user.code);
    });

    it("should throw error when JWT_SECRET_KEY is missing", async () => {
      process.env.JWT_SECRET_KEY = "";
      process.env.JWT_EXPIRES_IN = "30m";

      const { signToken } = await import("./jwtService.js");

      const user = { email: "test@example.com", code: "abc123" };
      expect(() => signToken(user)).toThrow("JWT setup variables are missing");
    });

    it("should throw error when JWT_EXPIRES_IN is missing", async () => {
      process.env.JWT_SECRET_KEY = "test-secret";
      process.env.JWT_EXPIRES_IN = "";

      const { signToken } = await import("./jwtService.js");

      const user = { email: "test@example.com", code: "abc123" };
      expect(() => signToken(user)).toThrow("JWT setup variables are missing");
    });
  });
});