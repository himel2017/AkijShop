import React from "react";

const Select = ({
    type,
    name,
    label,
    value,
    onChange,
    className,
    placeholder,
    error,
    options
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            <select
                name={name}
                id={name}
                className={className}
                onChange={onChange}
            >
                <option value="">Select a genre</option>
                {options.map(option => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default Select;
