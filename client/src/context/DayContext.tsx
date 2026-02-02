import { createContext, useCallback, useContext, useState } from "react";
import type { DayInterface } from "../types/interfaces";
import { useApi } from "../hooks/useApi";

// interface
interface DayContextInterface {
  days: DayInterface[];
  setDays: (days: DayInterface[]) => void;
  refetchDays: () => void;
}

// provider + consumer
const DayContext = createContext<DayContextInterface | undefined>(undefined);

export const DayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [days, setDays] = useState<DayInterface[]>([]);
  const api = useApi();

  const refetchDays = useCallback(() => {
    api.get(`/day`, { withCredentials: true }).then((res) => {
      if (res.data?.data) {
        setDays(res.data.data);
      }
    });
  }, [api]);

  return (
    <DayContext.Provider value={{ days, setDays, refetchDays }}>
      {children}
    </DayContext.Provider>
  );
};

// hook
export const useDays = (): DayContextInterface => {
  const context = useContext(DayContext);
  if (!context) throw new Error("useDays must be used within DayContextProvider");
  return context;
};
