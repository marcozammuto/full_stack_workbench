import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";

// interfaces
interface userInterface {
  email: string;
  code: string;
}

interface UserContextInterface {
  user: userInterface | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// provider
const UserContext = createContext<UserContextInterface | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<userInterface | null>(null);
  const navigate = useNavigate();
  const api = useApi();

  const login = async (email: string, password: string): Promise<void> => {
    if (!email || !password) {
      throw new Error("Credentials uncomplete");
    }
    const response = await api.post(
      `/auth/login`,
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

  const logout = (): void => {
    navigate("/");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// hook / consumer
export const useUser = (): UserContextInterface => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within UserContextProvider");
  return context;
};
