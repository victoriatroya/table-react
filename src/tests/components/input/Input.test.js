import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Pokemon from "../../../pages/pokemon/Pokemon";

test("render search input", () => {
  render(<Pokemon />);

  const inputEl = screen.getByTestId("input-search");
  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute("type", "text");
});

test("pass valid value search to test input field", () => {
  render(<Pokemon />);

  const inputEl = screen.getByTestId("input-search");
  userEvent.type(inputEl, "pokemon");

  expect(screen.getByTestId("input-search")).toHaveValue("pokemon");
});
