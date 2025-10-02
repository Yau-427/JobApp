import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  mask?: (value: string) => string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, error, mask, placeholder }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (mask) {
            newValue = mask(newValue);
        }
        onChange(name, newValue);
    };

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-input ${error ? 'input-error' : ''}`}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;