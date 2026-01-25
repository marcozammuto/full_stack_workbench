import { useState } from "react";
import { useLookup } from "../../../context/LookupContext";
import type { DayInterface, LookupItemInterface } from "../../../types/interfaces";
import { useApi } from "../../../hooks/useApi";

const InsertDay = () => {
  const { lookup } = useLookup();
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

  return (
    <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form className="w-full">
        <div className="flex items-center border-b border-teal-500 py-2">
          {/* date - disabled */}
          <div>
            <label htmlFor="date" className="block text-sm text-gray-600 mb-1">
              Date
            </label>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              id="date"
              type="date"
              aria-label="Date"
              defaultValue={todayDate}
              disabled
            />
          </div>
          {/* start time - disabled */}
          <div>
            <label
              htmlFor="startedAt"
              className="block text-sm text-gray-600 mb-1"
            >
              Start
            </label>
            <input
              id="startedAt"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
            <label
              htmlFor="endedAt"
              className="block text-sm text-gray-600 mb-1"
            >
              End
            </label>
            <input
              id="endedAt"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
              <label
                htmlFor="dayModifier"
                className="block text-sm text-gray-600 mb-1"
              >
                Variation
              </label>
              <select
                id="dayModifier"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
            <label htmlFor="notes" className="block text-sm text-gray-600 mb-1">
              Notes
            </label>
            <input
              id="notes"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
        <p className="block text-black">{feedback}</p>
      </form>
    </div>
  );
};

export default InsertDay;
