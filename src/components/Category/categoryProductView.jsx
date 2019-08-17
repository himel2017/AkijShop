import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductImages from "../../images/Spa_500_ml_Bottole.png";
import config from "../../config.json";
import axios from "axios";
import SingleProduct from "./../SingleProduct/singleProduct";
import SliderMenu from "./../slider/sliderMenu";

class CategoryProductView extends Component {
    state = {
        products: [],
        categories: []
    };

    async componentDidMount() {
        var id = this.props.match.params.id;
        // console.log(id);
        const { data: products } = await axios.get(
            config.categoryProductUrl + `${id}`
        );

        const { data: categories } = await axios.get(config.categoryUrl);
        this.setState({ products, categories });
    }

    async componentDidUpdate(prevProps, prevState) {
        var id = this.props.match.params.id;
        if (id !== prevProps.match.params.id) {
            const { data: products } = await axios.get(
                config.categoryProductUrl + `${id}`
            );

            const { data: categories } = await axios.get(config.categoryUrl);
            this.setState({ products, categories });
        }
    }

    render() {
        return (
            <section className="productList mt-3 mb-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            {this.state.categories.map(catMenu => (
                                <SliderMenu
                                    CatMenuName={catMenu.name}
                                    catId={catMenu.id}
                                    id={catMenu.id}
                                />
                            ))}
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                {this.state.products.map(product => (
                                    <div className="col-md-3">
                                        <SingleProduct
                                            title={product.title}
                                            price={product.price}
                                            id={product.id}
                                            slug={product.slug}
                                            image={product.images[0].image}
                                            product={product}
                                            onAddToCart={() =>
                                                this.handleAddToCart(product)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default CategoryProductView;
