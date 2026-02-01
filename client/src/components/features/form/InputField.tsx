import { useTheme } from "../../../context/index";
import type { FieldInterface } from "../../../types/interfaces";
import { capitalizeString } from "../../../utils/strings";

const InputField = ({
  field,
  placeholder,
  label,
  type,
  onChange,
}: FieldInterface) => {
  const { isDarkMode } = useTheme();
  const error = false;
  return (
    <div className="space-y-1 py-1 px-2">
      <label
        className={`block text-sm font-medium text-gray-${
          isDarkMode ? "300" : "700"
        }`}
        htmlFor={field}
      >
        {capitalizeString(label)}
      </label>
      <input
        id={field}
        name={field}
        type={type}
        placeholder={placeholder}
        onChange={() => onChange}
        className={`w-full px-3 py-2 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
        }`}
      />
      {error && (
        <p className="text-sm text-red-500">Please provide a valid {label}.</p>
      )}
    </div>
  );
};

export default InputField;
