import { createContext, useContext, useState } from "react";
import type { BackendInterface } from "../types/interfaces";
import { availableBackends } from "../types/constants";

/**
 * Backend Context
 * Manages the currently selected backend (Node, Spring, Flask)
 * Allows switching between different API implementations
 */

interface BackendContextInterface {
  backend: BackendInterface;
  setBackend: (backend: BackendInterface) => void;
}

const BackendContext = createContext<BackendContextInterface | undefined>(
  undefined,
);

/**
 * Provider component for backend selection
 * Initializes with Node.js backend as default
 */
export const BackendContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backend, setBackend] = useState<BackendInterface>(
    availableBackends[0],
  );
  return (
    <BackendContext.Provider value={{ backend, setBackend }}>
      {children}
    </BackendContext.Provider>
  );
};

/**
 * Hook to access and switch the current backend
 * @returns Current backend and setter function
 * @throws Error if used outside of BackendContextProvider
 */
export const useBackend = (): BackendContextInterface => {
  const context = useContext(BackendContext);
  if (!context)
    throw new Error("useBackend must be used within BackendContextProvider");
  return context;
};
