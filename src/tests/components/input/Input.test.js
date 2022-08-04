import {render, screen} from '@testing-library/react'
import Pokemon from "../../../pages/pokemon/Pokemon";
import userEvent from "@testing-library/user-event";

test('render search input', () => {
    render(<Pokemon />);

    const inputEl = screen.getByTestId("input-search");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
});

test('pass valid email to test email input field', () => {
    render(<Pokemon />);

    const inputEl = screen.getByTestId("input-search");
    userEvent.type(inputEl, "pokemon");

    expect(screen.getByTestId("input-search")).toHaveValue("pokemon");
});