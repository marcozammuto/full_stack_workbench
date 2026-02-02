import axios from "axios";
import { useBackend } from "../context/BackendContext";
import { useUser } from "../context/UserContext.tsx";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";

/**
 * Custom hook that creates an axios instance configured for API calls
 *
 * Features:
 * - Automatically uses the current backend endpoint from BackendContext
 * - Includes credentials (cookies) for authentication
 * - Intercepts 401 responses to handle session expiration
 *
 * @returns Configured axios instance
 */
export const useApi = () => {
  const { backend } = useBackend();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleUnauthorized = useCallback(() => {
    setUser(null);
    navigate("/");
  }, [setUser, navigate]);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: backend?.endpoint,
      withCredentials: true,
      // headers: { "Access-Control-Allow-Origin": "*" },
    });
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
          handleUnauthorized();
        } else {
          return Promise.reject(error);
        }
      },
    );
    return instance;
  }, [backend?.endpoint]);
  return api;
};
