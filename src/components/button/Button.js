import React from 'react';

import "./button.scss";

const Button = ({ name, onClick, iconLeft, image, classButton, buttonDisabled }) => {
    return (
        <button
            onClick={onClick}
            className={`button-app ${classButton} ${buttonDisabled && 'button-disabled'}`}
            disabled={buttonDisabled}
        >
            {iconLeft && <img src={image} alt=""/>}
            {name}
        </button>
    );
};

export default Button;