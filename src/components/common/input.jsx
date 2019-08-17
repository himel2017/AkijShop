import React from "react";

const Input = ({
    type,
    name,
    label,
    value,
    onChange,
    className,
    placeholder,
    error
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className={className}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                id={name}
            />
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default Input;
