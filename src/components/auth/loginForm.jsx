import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { Link } from "react-router-dom";
import * as userService from "../../services/userService";
import auth from "../../services/authService";

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {},
        serverError: "",
        successMessage: ""
    };

    schema = {
        username: Joi.string()
            .required()
            .label("Username"),
        password: Joi.string()
            .required()
            .label("Password")
    };

    doSubmit = async () => {
        try {
            let response = await userService.login(this.state.data);
            let status = response.data.status;
            if (status) {
                this.setState({ serverError: "" });
                this.setState({ successMessage: response.data.message });
                auth.login(response.data.user.api_token);
                window.location = "/";
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
            <div className="login-form-page mt-2 container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card card-body p-3">
                        <h2 className="text-center">Login Now</h2>
                        <hr />

                        {this.printMessages()}

                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput(
                                "username",
                                "Username Or Email Address",
                                "text",
                                "Enter Username or Email Address",
                                "form-control"
                            )}

                            {this.renderInput(
                                "password",
                                "Password",
                                "password",
                                "Enter Password",
                                "form-control"
                            )}

                            <div className="mt-4">
                                <div className="float-left">
                                    {this.renderButton(
                                        "Login",
                                        "btn btn-success"
                                    )}
                                </div>
                                <p className="float-right">
                                    New User ?
                                    <Link to="/sign-up"> Sign Up Now</Link>
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

export default LoginForm;
