import { useTheme } from "../../../context/index";
import type { FieldInterface } from "../../../types/interfaces";
import { capitalizeString } from "../../../utils/strings";

const InputField = ({
  field,
  placeholder,
  label,
  type,
  onChange,
  error,
  required,
}: FieldInterface) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="space-y-1 py-1 px-2">
      <label
        className={`block text-sm font-medium ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
        htmlFor={field}
      >
        {capitalizeString(label)}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={field}
        name={field}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-md border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error
            ? "border-red-500 focus:ring-red-500"
            : isDarkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
        } ${isDarkMode ? "bg-gray-700" : "bg-white"}`}
      />
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
