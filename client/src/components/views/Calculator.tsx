import React, { useState } from "react";
import { Display, Button, History } from "../features/calculator/index";
import { useCalculator } from "../../hooks/useCalculator";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useTheme } from "../../context/index";
import type { Operation } from "../../utils/calculator";

const Calculator: React.FC = () => {
  const {
    display,
    expression,
    isDegrees,
    history,
    memory,
    inputDigit,
    inputDecimal,
    clear,
    clearEntry,
    performOperation,
    calculate,
    applyFunction,
    toggleSign,
    percent,
    backspace,
    toggleAngleMode,
    clearHistory,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
  } = useCalculator();

  const { isDarkMode } = useTheme();
  const [showScientific, setShowScientific] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useKeyboard({
    onDigit: inputDigit,
    onOperator: (op) => performOperation(op as Operation),
    onEquals: calculate,
    onClear: clear,
    onBackspace: backspace,
    onDecimal: inputDecimal,
  });

  return (
    <div className="flex justify-center items-start gap-4">
      {/* Main Calculator */}
      <div
        className={`rounded-2xl p-6 shadow-lg w-[360px] ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Display expression={expression} value={display} />

        {/* Controls */}
        <div className="flex justify-between items-center my-4 py-2">
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                isDegrees
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              DEG
            </span>
            <span
              className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                !isDegrees
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                    ? "bg-gray-700 text-gray-400"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              RAD
            </span>
            {memory !== 0 && (
              <span className="px-3 py-1 rounded text-sm font-semibold bg-purple-500 text-white">
                M
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer hover:-translate-y-0.5 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide" : "History"}
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer hover:-translate-y-0.5 ${
                isDarkMode
                  ? "bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
              onClick={() => setShowScientific(!showScientific)}
            >
              {showScientific ? "Basic" : "Scientific"}
            </button>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid gap-2">
          {showScientific && (
            <div
              className={`grid grid-cols-4 gap-2 mb-4 pb-4 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Button
                label="sin"
                onClick={() => applyFunction("sin")}
                variant="function"
              />
              <Button
                label="cos"
                onClick={() => applyFunction("cos")}
                variant="function"
              />
              <Button
                label="tan"
                onClick={() => applyFunction("tan")}
                variant="function"
              />
              <Button
                label="√"
                onClick={() => applyFunction("sqrt")}
                variant="function"
              />

              <Button
                label="ln"
                onClick={() => applyFunction("ln")}
                variant="function"
              />
              <Button
                label="log"
                onClick={() => applyFunction("log")}
                variant="function"
              />
              <Button
                label="eˣ"
                onClick={() => applyFunction("exp")}
                variant="function"
              />
              <Button
                label="x!"
                onClick={() => applyFunction("factorial")}
                variant="function"
              />

              <Button label="MC" onClick={memoryClear} variant="special" />
              <Button label="MR" onClick={memoryRecall} variant="special" />
              <Button label="M+" onClick={memoryAdd} variant="special" />
              <Button label="M-" onClick={memorySubtract} variant="special" />

              <Button
                label={isDegrees ? "DEG" : "RAD"}
                onClick={toggleAngleMode}
                variant="special"
              />
              <Button
                label="xʸ"
                onClick={() => performOperation("^")}
                variant="operator"
              />
              <Button label="%" onClick={percent} variant="operator" />
              <Button label="⌫" onClick={backspace} variant="special" />
            </div>
          )}

          {/* Main Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button label="AC" onClick={clear} variant="clear" />
            <Button label="CE" onClick={clearEntry} variant="clear" />
            <Button label="+/-" onClick={toggleSign} variant="operator" />
            <Button
              label="÷"
              onClick={() => performOperation("/")}
              variant="operator"
            />

            <Button label="7" onClick={() => inputDigit("7")} />
            <Button label="8" onClick={() => inputDigit("8")} />
            <Button label="9" onClick={() => inputDigit("9")} />
            <Button
              label="×"
              onClick={() => performOperation("*")}
              variant="operator"
            />

            <Button label="4" onClick={() => inputDigit("4")} />
            <Button label="5" onClick={() => inputDigit("5")} />
            <Button label="6" onClick={() => inputDigit("6")} />
            <Button
              label="-"
              onClick={() => performOperation("-")}
              variant="operator"
            />

            <Button label="1" onClick={() => inputDigit("1")} />
            <Button label="2" onClick={() => inputDigit("2")} />
            <Button label="3" onClick={() => inputDigit("3")} />
            <Button
              label="+"
              onClick={() => performOperation("+")}
              variant="operator"
            />

            <Button label="0" onClick={() => inputDigit("0")} wide />
            <Button label="." onClick={inputDecimal} />
            <Button label="=" onClick={calculate} variant="equals" />
          </div>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && <History history={history} onClear={clearHistory} />}
    </div>
  );
};

export default Calculator;
