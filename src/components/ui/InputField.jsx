const InputField = ({ label, type, name, value, onChange, error, mask }) => {
    const handleChange = (e) => {
        let value = e.target.value;
        if (mask) {
            value = mask(value);
        }
        onChange(name, value);
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
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default InputField;