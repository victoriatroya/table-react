/* eslint-disable */
import React, { useState } from "react";

import {
  deletePokemon,
  addPokemon,
  updatePokemon,
} from "../../services/Pokemon";

import NewPokemonCard from "../newPokemonCard/NewPokemonCard";

import EditIcon from "../../assets/images/edit.svg";
import TrashIcon from "../../assets/images/trash.svg";

import "./table.scss";

const Table = ({
  data,
  showNewCard,
  setShowNewCard,
  getDataPokemon,
  searchValue,
  setData,
}) => {
  const [valueRangeAttack, setValueRangeAttack] = useState(50);
  const [valueRangeDefense, setValueRangeDefense] = useState(20);
  const [inputValue, setInputValue] = useState({
    name: "",
    image: "",
  });
  const [editData, setEditData] = useState(false);
  const [idRowEdit, setIdRowEdit] = useState();
  const { name, image } = inputValue;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const addNewPokemon = async (data) => {
    try {
      const response = await addPokemon(1, data);
      return setData(response);
    } catch (e) {
      console.log("error", e);
    }
  };

  const updateDataPokemon = async (id, data) => {
    try {
      await updatePokemon(id, data);
    } catch(e) {
      console.log("error", e);
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
      setShowNewCard(false);
      setInputValue({
        name: "",
        image: "",
      });
      setValueRangeAttack(50);
      setValueRangeDefense(20);
      await getDataPokemon(1);
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
      setShowNewCard(false);
      await getDataPokemon(1);
    }
  };

  const deleteRow = async (id) => {
    const newData = data.filter((item) => item.id !== id)

    try {
      await deletePokemon(id);
      setData(newData)
    } catch (e) {
      console.log(e)
    }
  };

  const showInformationPokemon = (id) => {
    setShowNewCard(true);

    const updateRow = data?.filter((item) => item.id === id);

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

  const filterDataTable = (data) =>
    data?.filter((value) => {
      if (!searchValue) {
        return value;
      } else if (
        value.name.toLowerCase().includes(searchValue?.toLowerCase()) ||
        value.attack
          .toString()
          .toLowerCase()
          .includes(searchValue?.toLowerCase()) ||
        value.defense
          .toString()
          .toLowerCase()
          .includes(searchValue?.toLowerCase())
      ) {
        return value;
      }
    });

  return (
    <>
      <div className="table-app">
        <div className="overflow">
          <table className="table-app__content" data-testid="pokemon-table">
            <thead>
              <tr className="header">
                <th className="header__item" scope="col">Nombre</th>
                <th className="header__item" scope="col">Imagen</th>
                <th className="header__item" scope="col">Ataque</th>
                <th className="header__item" scope="col">Defensa</th>
                <th className="header__item" scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                filterDataTable(data)?.map((item, index) => (
                  <tr className="body" key={`row-${index}`}  data-testid="item">
                    <td className="body__item">{item.name}</td>
                    <td className="body__item">
                      <img src={item.image} className="image" alt="image" />
                    </td>
                    <td className="body__item">{item.attack}</td>
                    <td className="body__item">{item.defense}</td>
                    <td className="body__item">
                      <div className="content">
                        <img
                          src={EditIcon}
                          alt="edit"
                          onClick={() => showInformationPokemon(item.id)}
                        />
                        <img
                          src={TrashIcon}
                          alt="trash"
                          data-testid="trash-button"
                          onClick={() => deleteRow(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showNewCard && (
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
          showCard={setShowNewCard}
        />
      )}
    </>
  );
};

export default Table;
