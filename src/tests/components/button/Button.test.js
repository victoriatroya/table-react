import React from 'react';
import { render, screen } from '@testing-library/react';

import NewPokemonCard from "../../../components/newPokemonCard/NewPokemonCard";
import Button from "../../../components/button/Button";

it('should render a button with the class', () => {
    render(<Button />);
    const primaryButton = screen.getByRole('button', { name: '' });
    expect(primaryButton).toHaveClass('button-app');
});

it('should render a button disabled', () => {
    render(<NewPokemonCard />);
    const primaryButton = screen.getByRole('button', { name: 'Guardar' });
    expect(primaryButton).toHaveClass('button-app');
    expect(primaryButton).toBeDisabled();
});