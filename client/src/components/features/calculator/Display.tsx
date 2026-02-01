import React from "react";
import { useTheme } from "../../../context/index";

interface DisplayProps {
  expression: string;
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ expression, value }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`rounded-2xl p-5 mb-4 min-h-[100px] flex flex-col justify-between shadow-inner ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`text-base text-right min-h-[24px] mb-2 break-words ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {expression || "\u00A0"}
      </div>
      <div
        className={`text-4xl text-right font-semibold break-words ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {value}
      </div>
    </div>
  );
};
