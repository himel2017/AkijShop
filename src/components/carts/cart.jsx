import React, { Component } from "react";
import cartService from "../../services/cartService";
import http from "../../services/httpService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Cart extends Component {
    product_quantity = React.createRef();
    state = {
        carts: [],
        product_quantity: {},
        shipping_cost: 50
    };
    async componentDidMount() {
        const carts = await cartService.getCartItems();
        this.setState({ carts: carts.data });
    }

    cartTotal() {
        let totalAmount = 0;
        this.state.carts.map(
            cart => (totalAmount += cart.product_quantity * cart.product.price)
        );
        return totalAmount;
    }

    handleDelete = async cart => {
        const cartDelete = await cartService.deleteCart(cart.id);
        if (cartDelete.data.status) {
            toast.success("Item Removed ");
        }
        const carts = this.state.carts.filter(c => c.id !== cart.id);
        this.setState({ carts });
    };

    handleChange = cart => {
        const product_quantity = this.product_quantity.current.value;
        if (product_quantity <= 0) {
            toast.error("Please give a valid quantity");
            return;
        }
        cart.product_quantity = product_quantity;
        const carts = [...this.state.carts];
        carts.cart = cart;
        this.setState({ carts });
        cartService.updateCart(cart.id, product_quantity);
    };

    render() {
        console.log("cart is", this.state.carts);
        return (
            <div className="cart-page pt-2 pb-5">
                <div className="container">
                    {this.state.carts.length == 0 && (
                        <React.Fragment>
                            <p className="alert alert-info mt-3">
                                <strong>Sorry !! </strong>
                                No Product has added to cart yet !! Please add
                                some product first at your cart
                            </p>
                            <Link to="/" className="btn btn-info">
                                <i className="fa fa-arrow-left" /> Go to Shop
                            </Link>
                        </React.Fragment>
                    )}

                    {this.state.carts.length > 0 && (
                        <React.Fragment>
                            <h3>Cart Items</h3>
                            <table className="table table">
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Product</td>
                                        <td>Quantity</td>
                                        <td>Unit Price</td>
                                        <td>Sub Total</td>
                                        <td>Action</td>
                                    </tr>

                                    <React.Fragment>
                                        {this.state.carts.map(cart => (
                                            <tr key={cart.id}>
                                                <td>
                                                    {this.state.carts.indexOf(
                                                        cart
                                                    ) + 1}
                                                </td>
                                                <td>{cart.product.title}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={
                                                            cart.product_quantity
                                                        }
                                                        ref={
                                                            this
                                                                .product_quantity
                                                        }
                                                        onChange={() =>
                                                            this.handleChange(
                                                                cart
                                                            )
                                                        }
                                                        name="product_quantity"
                                                    />
                                                </td>
                                                <td>
                                                    <strong>
                                                        {cart.product.price} BDT
                                                    </strong>
                                                </td>
                                                <td>
                                                    <strong className="text-danger">
                                                        {cart.product_quantity *
                                                            cart.product
                                                                .price}{" "}
                                                        BDT
                                                    </strong>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        title="Delete Item"
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                cart
                                                            )
                                                        }
                                                    >
                                                        <i className="fa fa-trash" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td
                                                colSpan="3"
                                                style={{ borderBottom: 0 }}
                                            />
                                            <td>
                                                <strong>Sub Total:</strong>
                                            </td>
                                            <td>
                                                <strong className="text-danger">
                                                    {this.cartTotal()} BDT
                                                </strong>
                                            </td>
                                            <td />
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan="3"
                                                style={{ border: 0 }}
                                            />
                                            <td>
                                                <strong>Shipping Cost:</strong>
                                            </td>
                                            <td>
                                                <strong className="text-danger">
                                                    {this.state.shipping_cost}
                                                    BDT
                                                </strong>
                                            </td>
                                            <td />
                                        </tr>
                                        <tr>
                                            <td
                                                colSpan="3"
                                                style={{ border: 0 }}
                                            />
                                            <td>
                                                <strong>Grand Total:</strong>
                                            </td>
                                            <td>
                                                <strong className="text-danger">
                                                    {this.cartTotal() +
                                                        this.state
                                                            .shipping_cost}
                                                    BDT
                                                </strong>
                                            </td>
                                            <td />
                                        </tr>
                                    </React.Fragment>
                                </thead>
                            </table>

                            <div className="float-right">
                                <Link to="/">
                                    <button className="btn btn-outline-info mr-2">
                                        <i className="fa fa-arrow-left" />
                                        Continue Shopping
                                    </button>
                                </Link>
                                <Link to="/checkout">
                                    <button className="btn btn-success">
                                        <i className="fa fa-check" /> Checkout
                                    </button>
                                </Link>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

export default Cart;
