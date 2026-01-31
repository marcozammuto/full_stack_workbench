import type { DayInterface } from "../../../types/interfaces";

const DayTable = ({ days }: { days: DayInterface[] }) => {
  return (
    <div className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {["Date", "Working", "Start", "End", "Notes"].map(
              (head: string) => (
                <td key={`${head.toLowerCase()}_key`} className="text-black">
                  {head}
                </td>
              ),
            )}
          </tr>
        </thead>
        <tbody>
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
