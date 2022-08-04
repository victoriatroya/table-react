/* eslint-disable */
import React from "react";

import { deletePokemon } from "../../services/Pokemon";

import EditIcon from "../../assets/images/edit.svg";
import TrashIcon from "../../assets/images/trash.svg";

import "./table.scss";

const Table = ({ data, setData, showInformationPokemon, searchValue }) => {
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

  const handleDeleteRow = async (id) => {
    const newData = data?.filter((item) => item.id !== id);
    try {
      await deletePokemon(id);
      setData(newData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="table-app">
        <div className="overflow">
          <table className="table-app__content" data-testid="pokemon-table">
            <thead>
              <tr className="header">
                <th className="header__item" scope="col">
                  Nombre
                </th>
                <th className="header__item" scope="col">
                  Imagen
                </th>
                <th className="header__item" scope="col">
                  Ataque
                </th>
                <th className="header__item" scope="col">
                  Defensa
                </th>
                <th className="header__item" scope="col">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 &&
                filterDataTable(data)?.map((item, index) => (
                  <tr className="body" key={`row-${index}`} data-testid="item">
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
                          onClick={() => handleDeleteRow(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
