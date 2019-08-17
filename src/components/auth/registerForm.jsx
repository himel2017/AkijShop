import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Link } from "react-router-dom";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class RegisterForm extends Form {
    state = {
        data: {
            first_name: "",
            last_name: "",
            email: "",
            phone_no: "",
            password: "",
            confirm_password: ""
        },
        errors: {},
        serverError: "",
        successMessage: ""
    };

    schema = {
        first_name: Joi.string()
            .min(3)
            .required()
            .label("First Name"),

        last_name: Joi.label("Last Name"),

        email: Joi.string()
            .required()
            .email()
            .label("Email"),

        phone_no: Joi.string()
            .required()
            .label("Phone No"),

        password: Joi.string()
            .required()
            .min(6)
            .label("Password"),

        confirm_password: Joi.string()
            .required()
            .min(6)
            .label("Confirm Password")
    };

    doSubmit = async () => {
        try {
            var response = await userService.register(this.state.data);
            var status = response.data.status;
            if (status) {
                this.setState({ serverError: "" });
                this.setState({ successMessage: response.data.message });
                auth.register(response.data.user.api_token);
                this.props.history.push("/");
            } else {
                this.setState({ successMessage: "" });
                this.setState({ serverError: response.data.message });
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    printMessages() {
        if (this.state.serverError.length > 0) {
            return (
                <p className="alert alert-danger">{this.state.serverError}</p>
            );
        } else {
            if (this.state.successMessage.length > 0) {
                return (
                    <p className="alert alert-success">
                        {this.state.successMessage}
                    </p>
                );
            }
        }
    }

    render() {
        return (
            <div className="login-form-page container mt-2">
                <div className="row justify-content-center">
                    <div className="col-md-8 card card-body p-3">
                        <h2 className="text-center">Create a New Account</h2>
                        <hr />

                        {this.printMessages()}

                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "first_name",
                                        "First name",
                                        "text",
                                        "Enter First Name",
                                        "form-control"
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "last_name",
                                        "Last name",
                                        "text",
                                        "Enter Last Name",
                                        "form-control"
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "phone_no",
                                        "Phone No",
                                        "Phone No",
                                        "Enter Phone No",
                                        "form-control"
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "email",
                                        "Email",
                                        "email",
                                        "Enter Email",
                                        "form-control"
                                    )}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "password",
                                        "Password",
                                        "password",
                                        "Enter Password",
                                        "form-control"
                                    )}
                                </div>
                                <div className="col-md-6">
                                    {this.renderInput(
                                        "confirm_password",
                                        "Confirm Password",
                                        "password",
                                        "Enter Confirm Password",
                                        "form-control"
                                    )}
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="float-left">
                                    {this.renderButton(
                                        "Register",
                                        "btn btn-success"
                                    )}
                                </div>
                                <p className="float-right">
                                    Already an account ?{" "}
                                    <Link to="/login">Login Now</Link>
                                </p>
                                <div className="clearfix" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
