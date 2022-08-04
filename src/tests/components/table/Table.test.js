import {render, screen, waitFor, fireEvent} from "@testing-library/react";

import Table from "../../../components/table/Table";

const dataTable = [
    {
        id: 1,
        name: 'Pikachu',
        image: 'src',
        defense: 40,
        attack: 20
    },
    {
        id: 2,
        name: 'Prueba 2',
        image: 'src',
        defense: 140,
        attack: 50
    },
];

test('renders with expected values', () => {
    render(<Table data={dataTable} />);

    expect(screen.getByRole('cell', { name: /Pikachu/i
    })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Prueba/i
    })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Pikachu/i
    })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /Prueba/i
    })).toBeInTheDocument();
});

it('has the correct class', () => {
    render(<Table employees={dataTable} />)
    expect(screen.getByRole('table')).toHaveAttribute(
        'class',
        'table-app__content'
    )
});