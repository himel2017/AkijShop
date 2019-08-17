import React, { Component } from "react";
import { Link } from "react-router-dom";
import cartService from "../../services/cartService";
import SearchProduct from "./searchProduct";

class Navbar extends Component {
    state = {
        // carts: []
    };
    style = {
        background: "#e76453"
    };

    // async componentDidMount() {
    //     console.log("Fetched Data from database");
    //     const carts = await cartService.getCartItems();
    //     this.setState({ carts: carts.data });
    // }
    render() {
        return (
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={this.style}
            >
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="container">
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    My Account
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    My Wishlist
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    Checkout
                                </Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-right ml-auto">
                            <SearchProduct />
                            <li className="nav-item">
                                <Link className="nav-link" to="/carts">
                                    Carts
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
