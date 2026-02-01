import { useReducer } from "react";
import PageHeading from "../shared/PageHeading";
import { useTheme } from "../../context/index";

interface CounterInterface {
  value: number;
  error: string;
}

const reducer = (state: CounterInterface, action: string) => {
  switch (action) {
    case "INCREMENT":
      return { error: "", value: state.value + 1 };
    case "DECREMENT":
      if (state.value === 0) {
        return {
          error: "Cannot decrement below 0",
          value: state.value,
        };
      } else {
        return {
          error: "",
          value: state.value - 1,
        };
      }
    default:
      return state;
  }
};

const Counter = () => {
  const { isDarkMode } = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    value: 0,
    error: "",
  });

  return (
    <>
      <PageHeading
        title="Counter"
        subtitle="Simple useState counter in order to learn testing"
      />
      <div
        className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} p-4 mb-4 rounded xl ${isDarkMode ? "text-white" : "text-gray-800"} flex justify-center align-center`}
      >
        <button
          className={` ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
          onClick={() => dispatch("DECREMENT")}
        >
          -
        </button>
        <div className="mx-4">
          <p data-testid="counter-value" className="text-2xl pt-1">
            {state.value}
          </p>
        </div>
        <button
          className={` ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
          onClick={() => dispatch("INCREMENT")}
        >
          +
        </button>
      </div>
      {state.error && <p className="text-red-500 text-center">{state.error}</p>}
    </>
  );
};

export default Counter;
