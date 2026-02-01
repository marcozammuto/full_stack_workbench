import React from "react";
import { HistoryEntry } from "../../../hooks/useCalculator";
import { useTheme } from "../../../context/index";

interface HistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  const { isDarkMode } = useTheme();

  const containerClass = `rounded-2xl p-6 shadow-lg w-[280px] ${
    isDarkMode ? "bg-gray-800" : "bg-white"
  }`;

  const headerClass = `flex justify-between items-center mb-4 pb-3 border-b ${
    isDarkMode ? "border-gray-700" : "border-gray-200"
  }`;

  const titleClass = `text-lg font-semibold ${
    isDarkMode ? "text-white" : "text-gray-800"
  }`;

  const clearBtnClass = `px-3 py-1 rounded-lg text-sm font-medium transition-all cursor-pointer ${
    isDarkMode
      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
      : "bg-red-50 text-red-500 hover:bg-red-100"
  }`;

  const emptyClass = `text-center py-8 ${
    isDarkMode ? "text-gray-500" : "text-gray-400"
  }`;

  const itemClass = `p-3 rounded-lg mb-2 ${
    isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
  }`;

  const expressionClass = `text-sm font-mono ${
    isDarkMode ? "text-gray-300" : "text-gray-600"
  }`;

  const resultClass = `text-lg font-semibold font-mono ${
    isDarkMode ? "text-blue-400" : "text-blue-600"
  }`;

  if (history.length === 0) {
    return (
      <div className={containerClass}>
        <div className={headerClass}>
          <h3 className={titleClass}>History</h3>
        </div>
        <div className={emptyClass}>No calculations yet</div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <h3 className={titleClass}>History</h3>
        <button onClick={onClear} className={clearBtnClass}>
          Clear
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {history.map((entry) => (
          <div key={entry.timestamp} className={itemClass}>
            <div className={expressionClass}>{entry.expression}</div>
            <div className={resultClass}>= {entry.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
