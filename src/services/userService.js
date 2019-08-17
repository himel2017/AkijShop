import http from "./httpService";
import { registrationUrl } from '../config.json';
import { loginUrl } from '../config.json';
import { getUserUrl } from '../config.json';

const apiEndpoint = registrationUrl;


export function register(user) {
    return http.post(apiEndpoint, {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_no: user.phone_no,
        password: user.password
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function login(user) {
    return http.post(loginUrl, {
        username: user.username,
        password: user.password
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export function getUser(api_token) {
    return http.get(getUserUrl, {
        api_token: api_token
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
}