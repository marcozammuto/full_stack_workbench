import "@testing-library/jest-dom";
import Counter from "./Counter";
import { ThemeContextProvider } from "../../context/ThemeContext";

import { screen, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Counter", () => {
  it("counter displays correct initial count", () => {
    render(
      <ThemeContextProvider>
        <Counter />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId("counter-value")).toHaveTextContent("0");
  });
});
