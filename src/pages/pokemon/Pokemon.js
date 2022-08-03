import React, { useState, useEffect } from "react";

import { getDataPokemons } from "../../services/Pokemon";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import MessageStatus from "../../components/messageStatus/messageStatus";

import SearchIcon from "../../assets/images/search.svg";
import AddIcon from "../../assets/images/add.svg";

import "./pokemon.scss";

const Pokemon = () => {
  const [showCard, setShowCard] = useState();
  const [dataTable, setDataTable] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    const tableData = async () => {
      await getPokemonData(1);
    };

    tableData();
  }, []);

  const getPokemonData = async (id) => {
    try {
      const response = await getDataPokemons(id);
      return setDataTable(response);
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="pokemon-app">
      <h1 className="title">Listado de Pokemon</h1>
      <div className="top">
        <div className="top__left">
          <img src={SearchIcon} alt="search" className="icon" />
          <Input
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
            name="searchInput"
            placeholder="Buscar"
            classesInput="search-input"
          />
        </div>
        <div className="top__right">
          <Button
            name="Nuevo"
            iconLeft
            image={AddIcon}
            onClick={() => setShowCard(true)}
          />
        </div>
      </div>
      <div className="middle">
        <Table
          data={dataTable}
          setData={setDataTable}
          showNewCard={showCard}
          setShowNewCard={setShowCard}
          searchValue={searchInput}
          getDataPokemon={getPokemonData}
        />
        {dataTable?.length === 0 ? (
          <MessageStatus text="No se encuentra información por el momento" />
        ) : null}
      </div>
    </div>
  );
};

export default Pokemon;
