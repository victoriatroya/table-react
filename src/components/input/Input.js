import React from "react";

import "./input.scss";

const Input = ({
  name,
  typeInput,
  placeholder,
  onChange,
  value,
  classesInput,
  idTest,
}) => (
  <input
    name={name  || ''}
    value={value}
    type={typeInput}
    placeholder={placeholder}
    onChange={onChange}
    className={`input ${classesInput}`}
    data-testid={idTest}
  />
);

export default Input;
