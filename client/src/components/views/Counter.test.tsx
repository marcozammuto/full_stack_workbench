import "@testing-library/jest-dom";
import Counter from "./Counter";
import { ThemeContextProvider } from "../../context/ThemeContext";
import { store } from "../../state/store";
import { Provider } from "react-redux";

import { screen, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Counter", () => {
  it("counter displays correct initial count", () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <Counter />
        </ThemeContextProvider>
      </Provider>,
    );

    expect(screen.getByTestId("counter-value")).toHaveTextContent("0");
  });
});
