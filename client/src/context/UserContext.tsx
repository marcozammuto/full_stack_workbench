import axios from "axios";
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router";
import { useBackend } from "./BackendContext";

/**
 * User Context
 * Manages authentication state and provides login/logout functionality
 */

/** User data structure returned from the API */
interface userInterface {
  email: string;
  code: string;
}

/** Context interface exposing user state and auth methods */
interface UserContextInterface {
  user: userInterface | null;
  setUser: (user: userInterface | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

/**
 * Provider component that wraps the app to provide authentication context
 * @param children - Child components that will have access to auth context
 */
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<userInterface | null>(null);
  const { backend } = useBackend();
  const navigate = useNavigate();

  /**
   * Authenticates user with email and password
   * On success, stores user data and redirects to /bookings
   * @throws Error if credentials are empty or API call fails
   */
  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      throw new Error("Credentials uncomplete");
    }
    const response = await axios.post(
      `${backend?.endpoint}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
    if (response.status === 200) {
      setUser(response.data);
      navigate("/bookings");
    }
  };

  /** Clears user session and redirects to home page */
  const logout = (): void => {
    navigate("/");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

/**
 * Hook to access user authentication state and methods
 * @returns User context with current user, setUser, login, and logout
 * @throws Error if used outside of UserContextProvider
 */
export const useUser = (): UserContextInterface => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within UserContextProvider");
  return context;
};
