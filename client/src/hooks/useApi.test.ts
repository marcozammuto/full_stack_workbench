import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useApi } from "./useApi";

// Mock dependencies
const mockNavigate = vi.fn();
const mockSetUser = vi.fn();
const mockBackend = { endpoint: "http://localhost:3001", name: "Node" };

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../context/BackendContext", () => ({
  useBackend: () => ({ backend: mockBackend }),
}));

vi.mock("../context/UserContext.tsx", () => ({
  useUser: () => ({ setUser: mockSetUser }),
}));

describe("useApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create an axios instance with correct baseURL", () => {
    const { result } = renderHook(() => useApi());

    expect(result.current.defaults.baseURL).toBe(mockBackend.endpoint);
  });

  it("should set withCredentials to true", () => {
    const { result } = renderHook(() => useApi());

    expect(result.current.defaults.withCredentials).toBe(true);
  });

  it("should handle 401 response by clearing user and navigating", async () => {
    const { result } = renderHook(() => useApi());

    // Create a mock 401 error
    const error = {
      response: { status: 401 },
    };

    // Get the interceptor and simulate a 401 error
    const interceptors = (result.current.interceptors.response as any).handlers;
    const errorHandler = interceptors[0].rejected;

    await errorHandler(error);

    expect(mockSetUser).toHaveBeenCalledWith(null);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should reject non-401 errors normally", async () => {
    const { result } = renderHook(() => useApi());

    const error = {
      response: { status: 500 },
      message: "Internal Server Error",
    };

    const interceptors = (result.current.interceptors.response as any).handlers;
    const errorHandler = interceptors[0].rejected;

    await expect(errorHandler(error)).rejects.toEqual(error);
  });
});
