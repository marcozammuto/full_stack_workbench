import { createContext, useContext, useState } from "react";
import type { DayInterface } from "../types/interfaces";

// interface
interface DayContextInterface {
  days: DayInterface[];
  setDays: (days: DayInterface[]) => void;
}

// provider + consumer
const DayContext = createContext<DayContextInterface | undefined>(undefined);

export const DayContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [days, setDays] = useState<DayInterface[]>([]);
  return (
    <DayContext.Provider value={{ days, setDays }}>
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
