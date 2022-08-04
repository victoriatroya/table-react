import React from "react";

import Input from "../input/Input";
import Button from "../button/Button";
import RangeComponent from "../range/Range";

import CancelIcon from "../../assets/images/close.svg";
import SaveIcon from "../../assets/images/save.svg";

import "./newPokemonCard.scss";

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
  showCard,
}) => {
  return (
    <div className="new-card-pokemon" data-testid="new-card-pokemon">
      <p className="title-card">Nuevo Pokemon</p>
      <div className="new-card-pokemon__content">
        <div className="left">
          <div className="left__item">
            <p data-testid="text-name">Nombre:</p>
            <Input
              name="name"
              value={inputName}
              onChange={(value) => setInputName(value)}
              classesInput="input-card"
              idTest="name-input"
            />
          </div>
          <div className="left__item">
            <p>Imagen:</p>
            <Input
              name="image"
              value={inputImage}
              onChange={(value) => setInputImage(value)}
              classesInput="input-card"
              idTest="image-input"
            />
          </div>
        </div>
        <div className="right">
          <div className="right__item">
            <p className="text-item">Ataque:</p>
            <RangeComponent
              name="attack"
              value={valueAttack}
              onChange={onChangeAttack}
              minValue={0}
              maxValue={100}
              idInput="attack-range"
            />
          </div>
          <div className="right__item">
            <p className="text-item">Defensa:</p>
            <RangeComponent
              name="defense"
              value={valueDefense}
              onChange={onChangeDefense}
              minValue={0}
              maxValue={100}
              idInput="defense-range"
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
          idButton="button-save"
        />
        <Button
          name="Cancelar"
          iconLeft
          image={CancelIcon}
          onClick={() => showCard(false)}
          idButton="button-save"
        />
      </div>
    </div>
  );
};

export default NewPokemonCard;
