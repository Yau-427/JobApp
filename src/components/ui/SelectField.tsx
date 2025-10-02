import React from 'react';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: Option[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
                         label,
                         name,
                         value,
                         onChange,
                         options,
                         error,
                         required = false,
                         disabled = false
                     }) => {
    const selectedOption = options.find(option => option.value === value) || null;

    const handleChange = (selectedOption: Option | null) => {
        onChange(name, selectedOption ? selectedOption.value : '');
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            padding: '2px 4px',
            borderRadius: '12px',
            border: `1px solid ${error ? 'var(--error-color)' : 'var(--border-color)'}`,
            fontSize: '16px',
            background: 'rgba(var(--white-rgb), 0.85)',
            transition: 'all 0.3s ease',
            boxShadow: state.isFocused ? `0 0 0 3px rgba(${error ? 'var(--error-rgb)' : 'var(--primary-rgb)'}, 0.2)` : 'inset 0 1px 3px rgba(var(--black-rgb), 0.08)',
            '&:hover': {
                borderColor: error ? 'var(--error-color)' : 'var(--primary-color)',
            },
            minHeight: '48px',
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: '6px 8px',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: 'var(--text-dark)',
            opacity: 0.6,
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'var(--text-dark)',
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9999,
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 15px rgba(var(--black-rgb), 0.1)',
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'var(--primary-color)' : state.isFocused ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
            color: state.isSelected ? 'white' : 'var(--text-dark)',
            '&:active': {
                backgroundColor: 'var(--primary-color)',
            },
        }),
    };

    return (
        <div className="form-group">
            <label className="form-label">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                isDisabled={disabled}
                placeholder="Выберите..."
                styles={customStyles}
                className={error ? 'is-invalid' : ''}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;