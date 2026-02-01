import React from "react";
import { useTheme } from "../../../context/index";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "number" | "operator" | "function" | "equals" | "clear" | "special";
  className?: string;
  wide?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "number",
  className = "",
  wide = false,
}) => {
  const { isDarkMode } = useTheme();

  const baseClasses =
    "py-4 px-2 border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-200 select-none shadow-md active:scale-95 active:shadow-sm hover:-translate-y-0.5 hover:shadow-lg";

  const variantClasses = {
    number: isDarkMode
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200",
    operator: "bg-blue-500 text-white hover:bg-blue-600",
    function: "bg-purple-500 text-white hover:bg-purple-600 text-sm",
    equals: "bg-green-500 text-white hover:bg-green-600",
    clear: "bg-red-500 text-white hover:bg-red-600",
    special: isDarkMode
      ? "bg-gray-700 text-white border-2 border-gray-600 hover:bg-gray-600"
      : "bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200",
  };

  const wideClass = wide ? "col-span-2" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${wideClass} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  );
};
