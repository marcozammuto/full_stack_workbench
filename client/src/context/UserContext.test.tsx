import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { UserContextProvider, useUser } from "./UserContext";
import axios from "axios";
import React from "react";

// Mock dependencies
const mockNavigate = vi.fn();
const mockBackend = { endpoint: "http://localhost:3001", name: "Node" };

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("./BackendContext", () => ({
  useBackend: () => ({ backend: mockBackend }),
}));

vi.mock("axios");

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

describe("UserContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useUser", () => {
    it("should throw error when used outside provider", () => {
      expect(() => {
        renderHook(() => useUser());
      }).toThrow("useUser must be used within UserContextProvider");
    });

    it("should provide user context when inside provider", () => {
      const { result } = renderHook(() => useUser(), { wrapper });

      expect(result.current).toHaveProperty("user");
      expect(result.current).toHaveProperty("setUser");
      expect(result.current).toHaveProperty("login");
      expect(result.current).toHaveProperty("logout");
    });

    it("should initialize with null user", () => {
      const { result } = renderHook(() => useUser(), { wrapper });

      expect(result.current.user).toBeNull();
    });
  });

  describe("login", () => {
    it("should throw error when credentials are empty", async () => {
      const { result } = renderHook(() => useUser(), { wrapper });

      await expect(result.current.login("", "password")).rejects.toThrow(
        "Credentials uncomplete",
      );
      await expect(result.current.login("email", "")).rejects.toThrow(
        "Credentials uncomplete",
      );
    });

    it("should set user and navigate on successful login", async () => {
      const mockUserData = {
        user: { email: "test@example.com", code: "abc123" },
      };

      vi.mocked(axios.post).mockResolvedValueOnce({
        status: 200,
        data: mockUserData,
      });

      const { result } = renderHook(() => useUser(), { wrapper });

      await act(async () => {
        await result.current.login("test@example.com", "password123");
      });

      expect(axios.post).toHaveBeenCalledWith(
        `${mockBackend.endpoint}/auth/login`,
        { email: "test@example.com", password: "password123" },
        { withCredentials: true },
      );
      expect(mockNavigate).toHaveBeenCalledWith("/bookings");
    });
  });

  describe("logout", () => {
    it("should clear user and navigate to home", () => {
      const { result } = renderHook(() => useUser(), { wrapper });

      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  describe("setUser", () => {
    it("should update user state", () => {
      const { result } = renderHook(() => useUser(), { wrapper });

      const newUser = { email: "new@example.com", code: "xyz789" };

      act(() => {
        result.current.setUser(newUser);
      });

      expect(result.current.user).toEqual(newUser);
    });
  });
});
