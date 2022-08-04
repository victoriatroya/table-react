/* eslint-disable */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import NewPokemonCard from "../../../components/newPokemonCard/NewPokemonCard";
import Table from "../../../components/table/Table";

test("renders component", () => {
  render(<NewPokemonCard />);

  const card = screen.getByTestId("new-card-pokemon");
  expect(card).toBeDefined();
});

test("buttons works", () => {
  render(<NewPokemonCard />);

  const button = screen.getByTestId("new-card-pokemon");
  fireEvent.click(button);
});

test("render name input and text", () => {
  render(<NewPokemonCard />);

  const gridItemText = screen.getByTestId("text-name").innerHTML;
  const nameInput = screen.getByTestId("name-input");
  expect(nameInput).toBeInTheDocument();
  expect(gridItemText).toBe("Nombre:");
});

test("render range input", () => {
  render(<NewPokemonCard />);

  const rangeInput = screen.getByTestId("attack-range");
  expect(rangeInput).toBeInTheDocument();
});
