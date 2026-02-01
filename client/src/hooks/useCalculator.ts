import { useState, useCallback } from "react";
import {
  performCalculation,
  applyScientificFunction,
  formatNumber,
  type Operation,
  type ScientificFunction,
} from "../utils/calculator";

export interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: number;
}

export const useCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isDegrees, setIsDegrees] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [memory, setMemory] = useState(0);

  const addToHistory = (expr: string, result: string) => {
    setHistory((prev) => [
      {
        expression: expr,
        result,
        timestamp: Date.now(),
      },
      ...prev.slice(0, 49),
    ]);
  };

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForOperand) {
        setDisplay(digit);
        setWaitingForOperand(false);
        setExpression((prev) => prev + digit);
      } else {
        if (display === "0" && digit !== ".") {
          setDisplay(digit);
          setExpression((prev) => prev.slice(0, -1) + digit);
        } else if (display.length < 12) {
          setDisplay((prev) => prev + digit);
          setExpression((prev) => prev + digit);
        }
      }
    },
    [display, waitingForOperand],
  );

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setExpression((prev) => prev + "0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay((prev) => prev + ".");
      setExpression((prev) => prev + ".");
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay("0");
    setExpression("");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay("0");
  }, []);

  const performOperation = useCallback(
    (nextOperation: Operation) => {
      const inputValue = parseFloat(display);

      if (previousValue === null) {
        setPreviousValue(inputValue);
        setExpression((prev) => prev + ` ${nextOperation} `);
      } else if (operation) {
        const currentValue = previousValue || 0;
        try {
          const newValue = performCalculation(
            currentValue,
            inputValue,
            operation,
          );
          const formattedValue = formatNumber(newValue);
          setDisplay(formattedValue);
          setPreviousValue(newValue);
          setExpression((prev) => prev + ` ${nextOperation} `);
        } catch (error) {
          setDisplay("Error");
          setPreviousValue(null);
          setExpression("");
        }
      }

      setWaitingForOperand(true);
      setOperation(nextOperation);
    },
    [display, operation, previousValue],
  );

  const calculate = useCallback(() => {
    const inputValue = parseFloat(display);

    if (operation && previousValue !== null) {
      try {
        const result = performCalculation(previousValue, inputValue, operation);
        const formattedResult = formatNumber(result);
        addToHistory(expression, formattedResult);
        setDisplay(formattedResult);
        setExpression(formattedResult);
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay("Error");
        setExpression("");
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
      }
    }
  }, [display, expression, operation, previousValue]);

  const applyFunction = useCallback(
    (func: ScientificFunction) => {
      const value = parseFloat(display);
      try {
        const result = applyScientificFunction(value, func, isDegrees);
        const formattedResult = formatNumber(result);
        addToHistory(`${func}(${value})`, formattedResult);
        setDisplay(formattedResult);
        setExpression(formattedResult);
        setWaitingForOperand(true);
      } catch (error) {
        setDisplay("Error");
      }
    },
    [display, isDegrees],
  );

  const toggleSign = useCallback(() => {
    const value = parseFloat(display);
    const newValue = -value;
    setDisplay(formatNumber(newValue));
  }, [display]);

  const percent = useCallback(() => {
    const value = parseFloat(display);
    const newValue = value / 100;
    setDisplay(formatNumber(newValue));
  }, [display]);

  const backspace = useCallback(() => {
    if (display.length > 1 && display !== "0") {
      setDisplay((prev) => prev.slice(0, -1));
      setExpression((prev) => prev.slice(0, -1));
    } else {
      setDisplay("0");
    }
  }, [display]);

  const toggleAngleMode = useCallback(() => {
    setIsDegrees((prev) => !prev);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const memoryAdd = useCallback(() => {
    const value = parseFloat(display);
    setMemory((prev) => prev + value);
  }, [display]);

  const memorySubtract = useCallback(() => {
    const value = parseFloat(display);
    setMemory((prev) => prev - value);
  }, [display]);

  const memoryRecall = useCallback(() => {
    setDisplay(formatNumber(memory));
    setWaitingForOperand(true);
  }, [memory]);

  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  return {
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
  };
};
