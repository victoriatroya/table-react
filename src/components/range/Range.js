import React from 'react';

import './range.scss';

const RangeComponent = ({ minValue, maxValue, value, onChange, }) => {
    return (
        <div className="range">
            <p className="min-value">0</p>
            <div className="wrapper">
                <div className="value">{value}</div>
                <input
                    type="range"
                    value={value}
                    min={minValue}
                    max={maxValue}
                    autoComplete="off"
                    id="rangevalue"
                    onChange={onChange}
                    className={`slider ${value > 50 ? "slider-50" : "slider-0"}`}
                />
            </div>
            <p className="max-value">100</p>
        </div>
    );
};

export default RangeComponent;