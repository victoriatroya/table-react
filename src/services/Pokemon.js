import axios from "axios";

export const URL = 'https://bp-pokemons.herokuapp.com';

export const getDataPokemons = (idAuthor) => new Promise((resolve, reject) => {
    axios.get(`${URL}?idAuthor=${idAuthor}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
});

export const deletePokemon = (id) => new Promise((resolve, reject) => {
    axios.delete(`${URL}/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
});

export const addPokemon = (idAuthor, data) => new Promise((resolve, reject) => {
    axios.post(`${URL}?idAuthor=${idAuthor}`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
});

export const updatePokemon = (id, data) => new Promise((resolve, reject) => {
    axios.put(`${URL}/${id}`, data)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
});