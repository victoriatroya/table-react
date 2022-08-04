/* eslint-disable */
import { rest } from "msw";
import { setupServer } from "msw/node";

import "@testing-library/jest-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import {URL} from '../../services/Pokemon'
import Pokemon from "../../pages/pokemon/Pokemon";
import Table from "../../components/table/Table";

const wait = (seconds) => new Promise((r) => setTimeout(r, seconds * 1000));

const tableData = [
    { id: 1, name: "Pokemon #1", attack: 50, defense: 50, },
    { id: 2, name: "Pokemon #2", attack: 50, defense: 50, },
];

const server = setupServer(
    rest.get(URL, (req, res, ctx) => {
        return res(
            ctx.json(tableData)
        );
    }),
    rest.post(URL, (req, res, ctx) => {
        const params = req.url.searchParams.get('idAuthor=1')
        return res(ctx.json([
            params,
            { id: 4, text: req.body.text, done: false }
        ]));
    }),
    rest.delete(`${URL}/1`, (req, res, ctx) => {
            return res(ctx.json({id: 1}));
    }),
    rest.put(URL, (req, res, ctx) => {
            return res(ctx.json([
                { id: 3, text: req.body.text, done: false }
            ]));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should render the pokemon table", async () => {
    render(<Pokemon />);

    // Check the initial http request to get the items to be completed
    const text = await waitFor(() => screen.getByTestId('pokemon-table'));
    expect(text).toBeInTheDocument();
});

test("should delete the pokemon when clicked", async () => {
    const setData = jest.fn()

    const { getAllByTestId } = render(<Table data={tableData} setData={setData} />);

    // Wait for the initial http request to get the items to be completed
    await waitFor(() => expect(screen.getByTestId("pokemon-table")).toBeInTheDocument());

    const items = getAllByTestId("item");
    expect(items).toHaveLength(2);

    // Get the first delele button on the screen
    const trash = getAllByTestId("trash-button")[0];
    fireEvent.click(trash);

    await wait(1) // Fake delay to wait for the http request to finish

    expect(setData).toHaveBeenCalledWith([{"attack": 50, "defense": 50, "id": 2, "name": "Pokemon #2"}])
    expect(setData).toHaveBeenCalledTimes(1)
});