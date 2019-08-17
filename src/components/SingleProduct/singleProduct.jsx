import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../config.json";

class SingleProduct extends Component {
    state = {
        product: {}
    };

    // async componentDidMount () {
    //     var id = this.props.match.params.id;
    //     console.log(id);
    //     const {data: product} = await axios.get(`http://localhost:8080/Akijshop/api-data/products/${ id }`);
    //     this.setState({product});
    //     console.log(product);
    // }

    priexc = () => {
        this.props.history.push("/login");
    };

    render() {
        // console.log("Props is:", this.props);

        const product = this.props;
        return (
            <div className="indProduct">
                <div className="product-item-card">
                    <div className="card productCard">
                        <Link
                            to={`/products/${product.slug}`}
                            className="pointer"
                        >
                            <div className="card-body padding-bottom">
                                <h5> ৳ {product.price}</h5>
                                {/* <h3>
                                    <span className="takaIc">৳</span>
                                    <span className="cross"> 12.00</span>
                                </h3> */}
                                <p className="card-text">
                                    <img
                                        src={
                                            config.productsImageDirectoryUrl +
                                            `/${product.image}`
                                        }
                                        className="product-image"
                                        alt=""
                                    />
                                </p>
                                <p style={{ height: 25 }}>{product.title}</p>
                                <p className="small-text">500ml pet</p>
                            </div>
                        </Link>
                        <div
                            className="card-footer pointer"
                            onClick={() => product.onAddToCart(product.product)}
                        >
                            <small className="text-danger text-bold">
                                <i className="fa fa-plus" /> Add to cart
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProduct;
