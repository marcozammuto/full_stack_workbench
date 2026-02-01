import { useTheme } from "../../context/index";

export const TableHeading = ({ keys }: { keys: string[] }) => {
  const { isDarkMode } = useTheme();
  return (
    <thead className={isDarkMode ? "bg-gray-700" : "bg-gray-50"}>
      <tr>
        {keys.map((head: string) => (
          <th
            key={`${head}_heading_table_key`}
            className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
};
