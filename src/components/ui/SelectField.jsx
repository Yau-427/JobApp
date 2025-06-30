import React from 'react';

const SelectField = ({
                         label,
                         name,
                         value,
                         onChange,
                         options,
                         error,
                         required = false,
                         disabled = false
                     }) => {
    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    return (
        <div className="form-group">
            <label className="form-label">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>
            <select
                className={`form-select ${error ? 'is-invalid' : ''}`}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;