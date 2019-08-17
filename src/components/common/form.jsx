import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = {
            [name]: this.schema[name]
        };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        // Call server
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton(label, className) {
        return (
            <div className="form-group">
                <button
                    className={className}
                    disabled={this.validate()}
                    onClick={this.handleLogin}
                >
                    {label}
                </button>
            </div>
        );
    }

    renderInput(name, label, type, placeholder, className) {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                value={data[name]}
                className={className}
                type={type}
                placeholder={placeholder}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderSelect(name, label, type, placeholder, className, options) {
        const { data, errors } = this.state;
        return (
            <Select
                name={name}
                label={label}
                value={data[name]}
                className={className}
                type={type}
                placeholder={placeholder}
                onChange={this.handleChange}
                error={errors[name]}
                options={options}
            />
        );
    }

    render() {
        return <h2>Form</h2>;
    }
}

export default Form;
