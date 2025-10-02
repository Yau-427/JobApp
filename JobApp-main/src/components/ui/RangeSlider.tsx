import React from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (name: string, value: string) => void;
  name: string;
  displayValue?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ label, value, min, max, step, onChange, name, displayValue }) => {
    const percent = ((value - min) / (max - min)) * 100;
    const sliderStyle: React.CSSProperties = {
        background: `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percent}%, var(--border-color) ${percent}%, var(--border-color) 100%)`
    };

    return (
        <div className="form-group">
            <label className="form-label">
                {label}: <strong className="range-value">{displayValue || value}</strong>
            </label>
            <input
                type="range"
                className="form-range"
                style={sliderStyle}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
            />
            <div className="range-labels">
                <span className="range-min">Минимум: {min}</span> -
                <span className="range-max"> Максимум: {max}</span>
            </div>
        </div>
    );
};


export default RangeSlider;