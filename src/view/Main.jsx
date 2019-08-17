import React, { Component } from "react";
import SliderMenu from "../components/slider/sliderMenu";
import Slider from "../components/slider/slider";
import SingleProduct from "../components/SingleProduct/singleProduct";
import CategoryImage from "../components/Category/categoryImage";
import LargeImage from "../images/Group_1744.png";
import BrandDrinkImage from "../images/Group 1746@2x.png";
import AdverImage from "../images/Group 1788.png";
import disImages from "../images/Group 1747.png";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import config from "../config.json";
import http from "../services/httpService";
import auth from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartService from "../services/cartService";

class Main extends Component {
    state = {
        get: [],
        categories: [],
        carts: [],
        isAuthenticated: false
    };

    async componentDidMount() {
        const { data: get } = await axios.get(config.productsUrl, {
            headers: { "Content-Type": "application/json" }
        });
        const { data: categories } = await axios.get(config.categoryUrl);
        this.setState({ get, categories });

        const carts = await cartService.getCartItems();
        this.setState({ carts: carts.data });
    }

    handleAddToCart = async product => {
        const isAuth = await auth.checkIfAuthenticated();
        if (isAuth) {
            this.setState({ isAuthenticated: true });
        }

        let addToCart = [];
        if (this.state.isAuthenticated) {
            addToCart = await http.post(
                config.addToCartUrl,
                {
                    product_id: product.id,
                    address: auth.getToken(),
                    ip_or_user: false
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
        } else {
            addToCart = await http.post(
                config.addToCartUrl,
                {
                    product_id: product.id,
                    address: "",
                    ip_or_user: true
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        // console.log(addToCart.data);
        const carts = addToCart.data.carts;
        this.setState({ carts });
        toast.success("Product added to cart successfully !!");
    };

    totalCartAmount() {
        let totalAmount = 0;
        this.state.carts.map(
            cart => (totalAmount += cart.product_quantity * cart.product.price)
        );
        return totalAmount;
    }

    totalCartItems() {
        let totalItems = 0;
        this.state.carts.map(cart => (totalItems += cart.product_quantity));
        return totalItems;
    }

    render() {
        return (
            <React.Fragment>
                <section className="slider-area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 padding-0">
                                {this.state.categories.map(catMenu => (
                                    <SliderMenu
                                        CatMenuName={catMenu.name}
                                        catId={catMenu.id}
                                    />
                                ))}
                            </div>
                            <div className="col-lg-9 col-md-9 padding-0">
                                <Slider />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="productList">
                    <div className="container">
                        <div className="row">
                            {this.state.get.map(product => (
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
                </section>
                <section className="product-category-image">
                    <div className="category">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="">
                                    <div className="category-title">
                                        <h5>
                                            <Link to="ss">Category</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {this.state.categories.map(category => (
                                    <Link to={`/categories/${category.id}`}>
                                        <div className="col-lg-3 col-md-6 col-sm-6">
                                            <Link
                                                to={`/categories/${
                                                    category.id
                                                }`}
                                            >
                                                <CategoryImage
                                                    catImage={category.image}
                                                    catname={category.name}
                                                />
                                            </Link>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="brand-drinks-section">
                    <div className="brand-drinks">
                        <div className="container">
                            <div className="row justify-content-center branddrinkcat">
                                <div className="">
                                    <h6>Soft Drinks</h6>
                                    <h3>Mojo Drinks</h3>
                                </div>
                            </div>
                            <div className="fruitical-viewall">
                                <Link to="">
                                    View all{" "}
                                    <i className="fas fa-angle-right" />
                                </Link>
                            </div>
                            <div className="row">
                                <div className="col-lg-7 col-md-12 col-sm-12">
                                    <div className="large-brand">
                                        <img
                                            src={LargeImage}
                                            alt="mojoimage"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <SingleProduct />
                                            <SingleProduct />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <SingleProduct />
                                            <SingleProduct />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="advertise-sec">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <Link to="">
                                    <img
                                        src={AdverImage}
                                        alt=""
                                        className="img-fluid"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="brand-drinks-section">
                    <div className="brand-drinks">
                        <div className="container">
                            <div className="row justify-content-center branddrinkcat">
                                <div className="">
                                    <h6>Soft Drinks</h6>
                                    <h3>Mojo Drinks</h3>
                                </div>
                            </div>
                            <div className="fruitical-viewall">
                                <Link to="">
                                    View all{" "}
                                    <i className="fas fa-angle-right" />
                                </Link>
                            </div>
                            <div className="row">
                                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12">
                                    <div className="large-brand">
                                        <img
                                            src={BrandDrinkImage}
                                            alt="mojoimage"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                            <SingleProduct />
                                            <SingleProduct />
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <SingleProduct />
                                            <SingleProduct />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-center">
                    <div className="container ">
                        <div className="row">
                            <div className="offset-xl-3  col-xl-8 offset-lg-3  col-lg-8 offset-md-3 col-md-8 offsset-sm-0 col-sm-12 offset-0 col-12">
                                <div className="contact-center-inst">
                                    <div className="row">
                                        <div className="col-md-3 col-4">
                                            <div className="contact-logo ">
                                                <img src={disImages} alt="" />
                                                <p>Discount</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3  col-4">
                                            <div className="contact-logo ">
                                                <img src={disImages} alt="" />
                                                <p>Payment method</p>
                                            </div>
                                        </div>
                                        <div className="col-md-3  col-4">
                                            <div className="contact-logo ">
                                                <img src={disImages} alt="" />
                                                <p>Contact center</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Link to="/carts">
                    <div className="addtocard">
                        <div className="cartheader">
                            <i className="fas fa-cart-plus" />
                            <span className="itemcart">
                                {this.totalCartItems()} items
                            </span>
                        </div>
                        <div className="cartfooter">
                            <span>{this.totalCartAmount()} BDT</span>
                        </div>
                    </div>
                </Link>
            </React.Fragment>
        );
    }
}

export default Main;
