import { useContext, createContext, useState, useEffect } from "react";
import type { LookupInterface } from "../types/interfaces";
import { useBackend } from "./BackendContext";
import { useApi } from "../hooks/useApi";
import { useUser } from "./UserContext.tsx";

// interface
interface LookupContextInterface {
  lookup: LookupInterface | undefined;
}

// provider/consumer
const LookupContext = createContext<LookupContextInterface | undefined>(
  undefined,
);

export const LookupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const api = useApi();
  const { backend } = useBackend();
  const { user } = useUser();
  const [lookup, setLookup] = useState<LookupInterface>();
  useEffect(() => {
    if (user) {
      api
        .get(`/lookup`)
        .then((res) => {
          setLookup(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [backend.endpoint, user]);
  return (
    <LookupContext.Provider value={{ lookup }}>
      {children}
    </LookupContext.Provider>
  );
};

// custom hook
export const useLookup = (): LookupContextInterface => {
  const context = useContext(LookupContext);
  if (!context) throw new Error("useLookup must be used within LookupContextProvider");
  return context;
};
