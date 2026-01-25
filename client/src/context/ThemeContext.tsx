import { useState, createContext, useContext } from "react";

// interfaces
interface ThemeContextInterface {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// context
const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined,
);

// provider
export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const toggleTheme = (): void => {
    setDarkMode((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// hook
export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeContextProvider");
  return context;
};
