const RangeSlider = ({ label, value, min, max, step, onChange, name, displayValue }) => {
    const percent = ((value - min) / (max - min)) * 100;
    const sliderStyle = {
        background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${percent}%, #d1d5db ${percent}%, #d1d5db 100%)`
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