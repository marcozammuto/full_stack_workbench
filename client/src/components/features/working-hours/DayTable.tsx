import { useTheme } from "../../../context/ThemeContext";
import type { DayInterface } from "../../../types/interfaces";
import { TableHeading } from "../../shared/Tables";

const DayTable = ({ days }: { days: DayInterface[] }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`w-full ${isDarkMode ? "bg-gray-800" : "bg-white"} ${isDarkMode ? "text-gray-300" : "text-gray-600"}  shadow-md rounded px-8 pt-6 pb-8 mb-4`}
    >
      <table className="min-w-full">
        <TableHeading
          keys={["Date", "Channel", "Guest", "Status", "Property"]}
        />

        <tbody
          className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-200"}`}
        >
          {days &&
            days.map((day: DayInterface) => (
              <tr key={`${day.date}_key`}>
                <td className="text-black">{day.date}</td>
                <td className="text-black">{day.isWorkingDay ? "Y" : "N"}</td>
                <td className="text-black">{day.startedAt}</td>
                <td className="text-black">{day.endedAt}</td>
                <td className="text-black">{day.dayModifierCode}</td>
                <td className="text-black">{day.notes || "/"}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DayTable;
