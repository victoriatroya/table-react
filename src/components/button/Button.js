import React from "react";

import "./button.scss";

const Button = ({
  name,
  onClick,
  iconLeft,
  image,
  classButton,
  buttonDisabled,
  idButton,
}) => (
  <button
    onClick={onClick}
    className={`button-app ${classButton} ${
      buttonDisabled && "button-disabled"
    }`}
    disabled={buttonDisabled}
    data-testid={idButton}
  >
    {iconLeft && <img src={image} alt="" />}
    {name}
  </button>
);

export default Button;
