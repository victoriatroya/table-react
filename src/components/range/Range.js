import React from "react";

import "./range.scss";

const RangeComponent = ({
  minValue,
  maxValue,
  value,
  onChange,
  name,
  idInput,
}) => (
  <div className="range">
    <p className="min-value">0</p>
    <div className="wrapper">
      <div className="value">{value}</div>
      <input
        name={name}
        type="range"
        value={value}
        min={minValue}
        max={maxValue}
        autoComplete="off"
        data-testid={idInput}
        id="rangevalue"
        onChange={onChange}
      />
    </div>
    <p className="max-value">100</p>
  </div>
);

export default RangeComponent;
