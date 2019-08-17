import http from "./httpService";
import auth from "./authService";
import config from './../config.json';


export async function getCartItems() {
    const isAuth = await auth.checkIfAuthenticated();
    let address = "";
    let is_ip = true;

    if (isAuth) {
        address = auth.getToken();
        is_ip = false;
    }

    const carts = http.get(config.getCartUrl, {
        address: address,
        ip_or_user: is_ip
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
    return carts;
}

export async function deleteCart(cart_id) {

    const carts = http.post(config.getDeleteCartUrl, {
        cart_id: cart_id
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
    return carts;
}

export async function updateCart(cart_id, product_quantity) {
    const carts = http.post(config.getUpdateCartUrl, {
        cart_id: cart_id,
        product_quantity: product_quantity
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
    return carts;
}

export async function checkout(name, email, phone_no, shipping_address) {
    const address = "";
    const ip_or_user = "";

    const checkouts = http.post(config.getCheckoutUrl, {
        address: address,
        ip_or_user: ip_or_user,
        name: name,
        email: email,
        phone_no: phone_no,
        shipping_address: shipping_address
    }, {
        headers: { 'Content-Type': 'application/json' }
    })
    return checkouts;
}

export default {
    getCartItems,
    deleteCart,
    updateCart,
    checkout
}