import React, { Component } from "react";
import http from "../../services/httpService";
import config from "../../config.json";
import { Link } from "react-router-dom";

class SearchProduct extends Component {
    state = {
        searchValue: "",
        products: []
    };

    handleSearch = async e => {
        const searchValue = e.target.value;
        this.setState({ searchValue });

        const { data: products } = await http.get(
            config.productSearchUrl + this.state.searchValue,
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        this.setState({ products });

        console.log(config.productSearchUrl);
        console.log(this.state.products);
    };

    goProduct = product_slug => {
        window.location = "products/" + product_slug;
        // this.props.history.push("products/" + product_slug);
    };

    render() {
        return (
            <React.Fragment>
                <form className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        name="search"
                        value={this.state.searchValue}
                        onChange={this.handleSearch}
                        autoComplete="off"
                        placeholder="Search for products"
                        aria-label="Search"
                    />
                    {this.state.searchValue.length > 0 &&
                        this.state.products.length > 0 && (
                            <div className="product-lists">
                                <ul>
                                    {this.state.products.map(product => (
                                        <Link
                                            to={"products/" + product.slug}
                                            onClick={() =>
                                                this.setState({
                                                    searchValue: ""
                                                })
                                            }
                                            className="text-info"
                                        >
                                            <li key={product.id}>
                                                {product.title}
                                                <br />
                                                <span className="text-danger">
                                                    <strong>
                                                        {product.price} BDT
                                                    </strong>
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        )}
                </form>
            </React.Fragment>
        );
    }
}

export default SearchProduct;
