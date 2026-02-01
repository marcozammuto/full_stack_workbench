import { useState } from "react";
import { useLookup, useTheme } from "../../../context/index";
import type {
  DayInterface,
  LookupItemInterface,
} from "../../../types/interfaces";
import { useApi } from "../../../hooks/useApi";

const InsertDay = () => {
  const { lookup } = useLookup();
  const { isDarkMode } = useTheme();
  const today = new Date();
  const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString()}`;
  const isWeekend = [0, 6].includes(today.getDay());
  const [feedback, setFeedback] = useState<string>("");
  const [newDay, setNewDay] = useState<DayInterface>({
    date: new Date().toISOString().split("T")[0],
    isWorkingDay: !isWeekend,
    dayModifierCode: lookup?.holiday ? "NH" : isWeekend ? "WE" : "ST",
    startedAt: isWeekend ? "00:00" : "09:00",
    endedAt: isWeekend ? "00:00" : "18:00",
    notes: lookup?.holiday || "",
  });
  const api = useApi();

  const handleCreateNewDay = () => {
    api
      .post(
        `/day/`,
        {
          day: newDay,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        setFeedback(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputClasses = `appearance-none border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none ${
    isDarkMode
      ? "bg-gray-700 text-white placeholder-gray-400"
      : "bg-transparent text-gray-700 placeholder-gray-500"
  }`;

  const labelClasses = `block text-sm mb-1 ${
    isDarkMode ? "text-gray-300" : "text-gray-600"
  }`;

  const selectClasses = `appearance-none border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none ${
    isDarkMode ? "bg-gray-700 text-white" : "bg-transparent text-gray-700"
  }`;

  return (
    <div
      className={`w-full shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <form className="w-full">
        <div
          className={`flex items-center border-b py-2 ${
            isDarkMode ? "border-teal-400" : "border-teal-500"
          }`}
        >
          {/* date - disabled */}
          <div>
            <label htmlFor="date" className={labelClasses}>
              Date
            </label>
            <input
              className={inputClasses}
              id="date"
              type="date"
              aria-label="Date"
              defaultValue={todayDate}
              disabled
            />
          </div>
          {/* start time - disabled */}
          <div>
            <label htmlFor="startedAt" className={labelClasses}>
              Start
            </label>
            <input
              id="startedAt"
              className={inputClasses}
              type="time"
              aria-label="Start"
              disabled={isWeekend}
              defaultValue={newDay.startedAt}
              onChange={(e) =>
                setNewDay((prev) => ({
                  ...prev,
                  startedAt: String(e.target.value),
                }))
              }
            />
          </div>
          {/* end time */}
          <div>
            <label htmlFor="endedAt" className={labelClasses}>
              End
            </label>
            <input
              id="endedAt"
              className={inputClasses}
              type="time"
              disabled={!isWeekend}
              aria-label="End"
              defaultValue={newDay.endedAt}
              onChange={(e) =>
                setNewDay((prev) => ({
                  ...prev,
                  endedAt: String(e.target.value),
                }))
              }
            />
          </div>
          {lookup && lookup.dayModifier && (
            <div>
              <label htmlFor="dayModifier" className={labelClasses}>
                Variation
              </label>
              <select
                id="dayModifier"
                className={selectClasses}
                defaultValue={newDay.dayModifierCode}
              >
                {lookup.dayModifier.map((dm: LookupItemInterface) => (
                  <option key={`${dm.code}_key`} value={dm.code}>
                    {dm.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* notes */}
          <div>
            <label htmlFor="notes" className={labelClasses}>
              Notes
            </label>
            <input
              id="notes"
              className={inputClasses}
              type="text"
              aria-label="Notes"
              placeholder="Notes"
              defaultValue={newDay.notes}
              disabled={Boolean(lookup?.holiday)}
              onChange={(e) =>
                setNewDay((prev) => ({
                  ...prev,
                  notes: String(e.target.value).trim(),
                }))
              }
            />
          </div>
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={handleCreateNewDay}
          >
            Add
          </button>
        </div>
        <p className={`block ${isDarkMode ? "text-gray-200" : "text-black"}`}>
          {feedback}
        </p>
      </form>
    </div>
  );
};

export default InsertDay;
