import { createContext, useContext, useState } from "react";
import type { BackendInterface } from "../types/interfaces";
import { availableBackends } from "../types/constants";

// interfaces
interface BackendContextInterface {
  backend: BackendInterface;
  setBackend: (backend: BackendInterface) => void;
}
// provider
const BackendContext = createContext<BackendContextInterface | undefined>(
  undefined,
);

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

// hook
export const useBackend = (): BackendContextInterface => {
  const context = useContext(BackendContext);
  if (!context) throw new Error("useBackend must be used within BackendContextProvider");
  return context;
};
