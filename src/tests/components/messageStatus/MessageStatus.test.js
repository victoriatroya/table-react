import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import MessageStatus from "../../../components/messageStatus/messageStatus";

test('renders a message', () => {
    render(<MessageStatus text="No se encontro"/>)
    expect(screen.getByText('No se encontro')).toBeInTheDocument();
})