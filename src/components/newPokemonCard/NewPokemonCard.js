import React from 'react';
import Input from "../input/Input";

import CancelIcon from '../../assets/images/close.svg';
import SaveIcon from '../../assets/images/save.svg';

import './newPokemonCard.scss';
import Button from "../button/Button";
import RangeComponent from "../range/Range";

const NewPokemonCard = ({
        valueAttack,
        onChangeAttack,
        valueDefense,
        onChangeDefense,
        inputName,
        setInputName,
        inputImage,
        setInputImage,
        handleAddPokemon,
        editRow,
        handleEditPokemon,
    }) => {

    return (
        <div className="new-card-pokemon">
            <p className="title-card">Nuevo Pokemon</p>
            <div className="new-card-pokemon__content">
                <div className="left">
                    <div className="left__item">
                        <p>Nombre:</p>
                        <Input
                            value={inputName}
                            onChange={(value) => setInputName(value)}
                            classesInput="input-card"
                        />
                    </div>
                    <div className="left__item">
                        <p>Imagen:</p>
                        <Input
                            value={inputImage}
                            onChange={(value) => setInputImage(value)}
                            classesInput="input-card"
                        />
                    </div>
                </div>
                <div className="right">
                    <div className="right__item">
                        <p className="text">Ataque:</p>
                        <RangeComponent
                        value={valueAttack}
                        onChange={onChangeAttack}
                        minValue={0}
                        maxValue={100}
                    />
                    </div>
                    <div className="right__item">
                        <p className="text">Defensa:</p>
                        <RangeComponent
                            value={valueDefense}
                            onChange={onChangeDefense}
                            minValue={0}
                            maxValue={100}
                        />
                    </div>
                </div>
            </div>
            <div className="bottom">
                <Button
                    name="Guardar"
                    iconLeft
                    image={SaveIcon}
                    onClick={() => {
                        handleAddPokemon();
                        editRow && handleEditPokemon();
                    }}
                    buttonDisabled={!inputImage || !inputName}
                />
                <Button
                    name="Cancelar"
                    iconLeft
                    image={CancelIcon}
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};

export default NewPokemonCard;