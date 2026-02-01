import PageHeading from "../shared/PageHeading";
import { useTheme } from "../../context/index";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { decrement, increment } from "../features/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  return (
    <>
      <PageHeading
        title="Counter"
        subtitle="Simple useState counter in order to learn testing and Redux"
      />
      <div
        className={`${isDarkMode ? "bg-gray-800" : "bg-gray-100"} p-4 mb-4 rounded xl ${isDarkMode ? "text-white" : "text-gray-800"} flex justify-center align-center`}
      >
        <button
          className={` ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <div className="mx-4">
          <p data-testid="counter-value" className="text-2xl pt-1">
            {count}
          </p>
        </div>
        <button
          className={` ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Counter;
