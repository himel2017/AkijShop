import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import TopHeader from "./components/header/topHeader";
import MiddleHeader from "./components/header/middleHeader";
import Navbar from "./components/header/navbar";
import "./App.css";
import Main from "./view/Main";
import SingleProductView from "./components/SingleProduct/SingleProductView";
import CategoryProductView from "./components/Category/categoryProductView";
import "./index.css";
// import config from "./config.json";
import LoginForm from "./components/auth/loginForm";
import auth from "./services/authService";
import RegisterForm from "./components/auth/registerForm";
import Logout from "./components/auth/logout";
import Cart from "./components/carts/cart";
import { ToastContainer, toast } from "react-toastify";
// import http from "./services/httpService";
import Checkout from "./components/carts/checkout";

class App extends Component {
    state = {
        get: [],
        carts: []
    };

    async componentDidMount() {
        const user2 = await auth.getAuthenticatedUser();
        if (user2) {
            const user = user2.data.user;
            this.setState({ user });
        }
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <header id="header" className="">
                    <TopHeader />
                    <MiddleHeader user={this.state.user} />
                    <Navbar user={this.state.user} carts={this.state.carts} />
                </header>
                <Switch>
                    <Route
                        path="/products/:slug"
                        component={SingleProductView}
                    />
                    <Route
                        path="/categories/:id"
                        component={CategoryProductView}
                    />
                    <Route path="/index" component={Main} />
                    <Route path="/carts" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/sign-up" component={RegisterForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/logout" component={Logout} />
                    {/* <Route path="/clemon" component={Login} /> */}
                    <Route path="/" exact component={Main} />
                    {/* <Redirect to="/not-found" /> */}
                </Switch>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-xs-12">
                                <div className="footer-widget first">
                                    <div className="footer-logo">
                                        <img
                                            src="assets/images/brand/Final_Logo.svg"
                                            alt=""
                                            className="img-fluid"
                                        />

                                        <div className="footer-socialfirrow">
                                            <p>Connect with Social Media</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <div className="footer-widget-two">
                                    <div className="footer-logo">
                                        <div className="footer-social-2">
                                            <p>Contact us</p>
                                            <ul className="list-inline">
                                                <li className="">
                                                    <i className="fas fa-phone-square" />
                                                    Toll Free: 08000016609
                                                </li>
                                                <li className="">
                                                    <i className="far fa-envelope" />
                                                    ecommerce@akij.net
                                                </li>
                                                <li className="">
                                                    <i className="fas fa-map-marker-alt" />
                                                    Akij House, 198 Bir Uttam,
                                                    Mir Shawkat Sarak, Gulshan
                                                    Link Road, Tejgaon,
                                                    Dhaka-1208
                                                </li>
                                                <li className="">
                                                    <i className="fas fa-clock" />
                                                    Sat to Thu - 9:00am to
                                                    6:00pm (Friday Closed)
                                                </li>
                                                <li className="">
                                                    <i className="fab fa-google-play" />
                                                    Download our app
                                                </li>
                                                <img
                                                    src="assets/images/brand/Group 1707.png"
                                                    alt=""
                                                />
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <div className="footer-widget">
                                    <div className="footer-logo">
                                        <div className="footer-third">
                                            <p>Payment Methods </p>
                                            <img
                                                src="assets/images/brand/payment-gateway.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="footer-third-bottom">
                                            <h5>Customer Care</h5>
                                            <p>Delivery and Shipping</p>
                                            <p>Terms and Conditions</p>
                                            <p>F.A.Q</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-xs-12">
                                <div className="copyright">
                                    <p>
                                        Copyright 2018 Akij Group. All rights
                                        reserved. Developed by AKIJ IT
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <div className="copyright coppolicy">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            Copyright Policy
                                        </li>
                                        <li className="list-inline-item">
                                            Privacy Policy
                                        </li>
                                        <li className="list-inline-item">
                                            F.A.Q
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

export default App;
