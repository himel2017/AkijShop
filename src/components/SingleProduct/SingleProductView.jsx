import React, { Component } from "react";
import axios from "axios";
import config from "../../config.json";

class SingleProductView extends Component {
    state = {
        product: {}
    };
    async componentDidMount() {
        var slug = this.props.match.params.slug;
        const { data: product } = await axios.get(
            config.productSingleUrl + `${slug}`
        );
        this.setState({ product });
        console.log("product is", product);
    }

    render() {
        return (
            <div className="singleProductView">
                <div className="container mt-2 mb-2">
                    <div className="row">
                        <div className="col-md-3">
                            {this.state.product.images && (
                                <img
                                    src={
                                        config.productsImageDirectoryUrl +
                                        `/${this.state.product.images[0].image}`
                                    }
                                    className="product-image"
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="col-md-9">
                            <h3>{this.state.product.title}</h3>
                            <h4 className="text-danger">
                                {" "}
                                ৳ {this.state.product.price}
                            </h4>
                            <hr />
                            <div>{this.state.product.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProductView;
