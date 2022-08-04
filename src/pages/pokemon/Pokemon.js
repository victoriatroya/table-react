import React, { useState, useEffect } from "react";

import {
  addPokemon,
  getDataPokemons,
  updatePokemon,
} from "../../services/Pokemon";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import MessageStatus from "../../components/messageStatus/messageStatus";
import NewPokemonCard from "../../components/newPokemonCard/NewPokemonCard";

import SearchIcon from "../../assets/images/search.svg";
import AddIcon from "../../assets/images/add.svg";

import "./pokemon.scss";

const Pokemon = () => {
  const [showCard, setShowCard] = useState(false);
  const [dataTable, setDataTable] = useState();
  const [searchInput, setSearchInput] = useState();
  const [editData, setEditData] = useState(false);
  const [valueRangeAttack, setValueRangeAttack] = useState(50);
  const [valueRangeDefense, setValueRangeDefense] = useState(20);
  const [inputValue, setInputValue] = useState({
    name: "",
    image: "",
  });
  const [idRowEdit, setIdRowEdit] = useState();
  const { name, image } = inputValue;

  useEffect(() => {
    getPokemonData(1);
  }, []);

  const getPokemonData = async (id) => {
    try {
      const response = await getDataPokemons(id);
      return setDataTable(response);
    } catch (e) {
      console.log("error", e);
    }
  };

  const addNewPokemon = async (data) => {
    try {
      const response = await addPokemon(1, data);
      return setDataTable(response);
    } catch (e) {
      console.log("error", e);
    }
  };

  const updateDataPokemon = async (id, data) => {
    try {
      await updatePokemon(id, data);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const showInformationPokemon = (id) => {
    setShowCard(true);

    const updateRow = dataTable?.filter((item) => item.id === id);

    for (const value of updateRow) {
      const { name, image, defense, attack, id } = value;
      setInputValue({
        name,
        image,
      });
      setValueRangeDefense(defense);
      setValueRangeAttack(attack);
      setIdRowEdit(id);
    }
  };

  const handleNewPokemon = async () => {
    setEditData(false);
    if (name && image) {
      await addNewPokemon({
        name,
        image,
        attack: valueRangeAttack,
        defense: valueRangeDefense,
        hp: 100,
        type: "Dragon",
        idAuthor: 1,
      });
      setShowCard(false);
      setInputValue({
        name: "",
        image: "",
      });
      setValueRangeAttack(50);
      setValueRangeDefense(20);
      await getPokemonData(1);
    }
  };

  const handleEditPokemon = async () => {
    setEditData(true);
    if (name && image) {
      await updateDataPokemon(idRowEdit, {
        name,
        image,
        attack: valueRangeAttack,
        defense: valueRangeDefense,
        hp: 100,
        type: "Dragon",
        idAuthor: 1,
      });
      setShowCard(false);
    }
  };

  return (
    <div className="pokemon-app" data-testid="pokemon-app">
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
            idTest="input-search"
            typeInput="text"
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
          showInformationPokemon={showInformationPokemon}
        />
        {dataTable?.length === 0 ? (
          <MessageStatus text="No se encuentra información por el momento" />
        ) : null}
        {showCard && (
          <NewPokemonCard
            valueAttack={valueRangeAttack}
            valueDefense={valueRangeDefense}
            onChangeAttack={({ target }) => setValueRangeAttack(target.value)}
            onChangeDefense={({ target }) => setValueRangeDefense(target.value)}
            inputName={name}
            setInputName={(e) => handleOnChange(e)}
            inputImage={image}
            setInputImage={(e) => handleOnChange(e)}
            handleAddPokemon={handleNewPokemon}
            handleEditPokemon={handleEditPokemon}
            editRow={editData}
            showCard={setShowCard}
          />
        )}
      </div>
    </div>
  );
};

export default Pokemon;
