import axios from 'axios';
import { getUserUrl } from '../config.json';
const token_key = "api_token";

export function register(api_token) {
    localStorage.setItem(token_key, api_token);
}

export function login(api_token) {
    localStorage.setItem(token_key, api_token);
}

export function getToken() {
    return localStorage.getItem(token_key);
}

export function logout() {
    localStorage.removeItem(token_key);
}

export function getAuthenticatedUser() {
    const api_token = localStorage.getItem(token_key);
    // console.log(api_token);
    if (api_token === null) {
        return false;
    }
    // console.log("Full: " + getUserUrl + api_token)
    try {
        const user = axios.get(getUserUrl + api_token);
        return user;
    } catch (ex) {
        console.log(ex);
    }
    return false;
}

export async function checkIfAuthenticated() {
    const user2 = await this.getAuthenticatedUser();
    if (user2) {
        const user = user2.data.user;
        if (user != null) {
            if (user.id != null) {
                return true;
            }
        }

    }
    return false;
}

export async function authenticatedUserID() {
    const user2 = await this.getAuthenticatedUser();
    if (user2) {
        const user = user2.data.user;
        if (user != null) {
            if (user.id != null) {
                return user.id;
            }
        }

    }
    return false;
}


export default {
    register,
    login,
    logout,
    getAuthenticatedUser,
    getToken,
    checkIfAuthenticated,
    authenticatedUserID
}