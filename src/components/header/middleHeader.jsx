import React, { Component } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../../images/Final_Logo.jpg";

class MiddleHeader extends Component {
    render() {
        const { user } = this.props;

        return (
            <div className="middle-header">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-4 col-sm-3 col-12">
                            <div className="brandinglogo">
                                <Link to="/">
                                    <img
                                        src={BrandLogo}
                                        alt=""
                                        className="img-fluid"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-8 col-sm-9 col-12">
                            <div className="top-akij-contact">
                                <div className="common-icon">
                                    <div className="icon float-left">
                                        <i className="fas fa-phone" />
                                    </div>
                                    <div className="icon-message float-left">
                                        <p>Call us</p>
                                        <p className="stro">
                                            Toll-free: 000000000
                                        </p>
                                    </div>
                                </div>
                                <div className="common-icon">
                                    <div className="icon float-left">
                                        <i className="far fa-envelope" />
                                    </div>
                                    <div className="icon-message float-left">
                                        <p>Email us</p>
                                        <p className="stro">
                                            ecommerce@akij.net
                                        </p>
                                    </div>
                                </div>
                                {!user && (
                                    <React.Fragment>
                                        <div className="top-login">
                                            <button type="">
                                                <Link to="/login">Login</Link>
                                            </button>
                                        </div>
                                        <div className="top-register">
                                            <button>
                                                <Link to="/register">
                                                    Sign Up
                                                </Link>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )}

                                {user && (
                                    <React.Fragment>
                                        <div className="top-profile">
                                            <button className="btn text-black">
                                                <Link to="profile">
                                                    {user.first_name +
                                                        " " +
                                                        user.last_name}
                                                </Link>
                                            </button>
                                        </div>

                                        <div className="top-login">
                                            <button type="">
                                                <Link to="logout">Logout</Link>
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MiddleHeader;
