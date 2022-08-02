/* eslint-disable */
import React, { useState, useEffect } from 'react';

import {deletePokemon, addPokemon, updatePokemon } from "../../services/Pokemon";

import NewPokemonCard from "../newPokemonCard/NewPokemonCard";
import MessageStatus from "../messageStatus/messageStatus";

import EditIcon from "../../assets/images/edit.svg";
import TrashIcon from "../../assets/images/trash.svg";

import "./table.scss";

const Table = ({ data, showNewCard, setShowNewCard, getDataPokemon, searchValue, setData }) => {

    const [valueRangeAttack, setValueRangeAttack] = useState(50);
    const [valueRangeDefense, setValueRangeDefense] = useState(20);
    const [inputName, setInputName] = useState();
    const [inputImage, setInputImage] = useState();
    const [editData, setEditData] = useState(false);
    const [idRowEdit, setIdRowEdit] = useState();

    const deleteRowPokemon = async (id) => {
        try {
            const response = await deletePokemon(id);
            return setData(response);
        } catch {
            console.log('error')
        }
    };

    const addNewPokemon = async (data) => {
        try {
            const response = await addPokemon(1, data);
            return setData(response);
        } catch {
            console.log('error')
        }
    };

    const updateDataPokemon = async (id, data) => {
        try {
            await updatePokemon(id, data);
        } catch {
            console.log('error');
        }
    }

    const handleNewPokemon = async () => {
        setEditData(false);
        if (inputName && inputImage) {
            await addNewPokemon({
                name: inputName,
                image: inputImage,
                attack: valueRangeAttack,
                defense: valueRangeDefense,
                hp: 100,
                type: "Dragon",
                idAuthor: 1,
            })
            setShowNewCard(false);
            setInputName('');
            setInputImage('');
            setValueRangeAttack(50);
            setValueRangeDefense(20);
            await getDataPokemon(1);
        }
    };

    const handleEditPokemon = async () => {
        setEditData(true);

        if (inputName && inputImage) {
            await updateDataPokemon(idRowEdit,{
                name,
                image,
                attack: valueRangeAttack,
                defense: valueRangeDefense,
                hp: 100,
                type: "Dragon",
                idAuthor: 1,
            })
            setShowNewCard(false);
            await getDataPokemon(1);
        }
    };

    const deleteRow = async (id) => {
        const idToDelete = data?.filter((item) => item.id === id)?.map((item) => item.id);
        await deleteRowPokemon(idToDelete);
        await getDataPokemon(1)
    };

    const showInformationPokemon = (id) => {
        setShowNewCard(true);

        const updateRow = data?.filter((item) => item.id === id);
        for (const value of updateRow) {
            const {name, image, defense, attack, id} = value;
            setInputName(name);
            setInputImage(image);
            setValueRangeDefense(defense);
            setValueRangeAttack(attack);
            setIdRowEdit(id)
        }
    };

    const filterDataTable = (data) => data?.filter((value) => {
        if (!searchValue){
            return value;
        } else if (
            value.name.toLowerCase().includes(searchValue?.toLowerCase()) ||
            value.attack.toString().toLowerCase().includes(searchValue?.toLowerCase()) ||
            value.defense.toString().toLowerCase().includes(searchValue?.toLowerCase())
        ) {
            return value;
        }
    })

    return (
        <>
            <div className="table-app">
                <div className="overflow">
                    <table className="table-app__content">
                        <thead>
                        <tr className="header">
                            <th className="header__item">Nombre</th>
                            <th className="header__item">Imagen</th>
                            <th className="header__item">Ataque</th>
                            <th className="header__item">Defensa</th>
                            <th className="header__item">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.length > 0 && filterDataTable(data)?.map((item, index) =>
                            (
                                <tr className="body" key={`row-${index}`}>
                                    <td className="body__item">
                                        {item.name}
                                    </td>
                                    <td className="body__item">
                                        <img
                                            src={item.image}
                                            className="image"
                                        />
                                    </td>
                                    <td className="body__item">
                                        {item.attack}
                                    </td>
                                    <td className="body__item">
                                        {item.defense}
                                    </td>
                                    <td className="body__item">
                                        <div className="content">
                                            <img src={EditIcon} alt="edit" onClick={() => showInformationPokemon(item.id)} />
                                            <img src={TrashIcon} alt="trash" onClick={() => deleteRow(item.id)}/>
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
                    onChangeAttack={({target}) => setValueRangeAttack(target.value)}
                    onChangeDefense={({target}) => setValueRangeDefense(target.value)}
                    inputName={inputName}
                    setInputName={({target}) => setInputName(target.value)}
                    inputImage={inputImage}
                    setInputImage={({target}) => setInputImage(target.value)}
                    handleAddPokemon={handleNewPokemon}
                    handleEditPokemon={handleEditPokemon}
                    editRow={editData}
                />
            )}
        </>
    );
};

export default Table;