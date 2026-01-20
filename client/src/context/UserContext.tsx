import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// interfaces
// import { UserInterface } from "../types/interfaces";

interface UserContextInterface {
  user: string | null;
  setUser: (user: string) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/me")
      .then((response) => {
        if (response.data.auth) {
          setUser(response.data.user);
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p style={{ color: "white", marginTop: "20px" }}></p>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAdminProvider must be used within a AdminProvider");
  }
  return context;
};
