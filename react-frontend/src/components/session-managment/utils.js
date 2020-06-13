import jwtDecode from "jwt-decode";
import axios from 'axios';

export const regularUser = "regular";
export const adminUser = "admin";

export const isUserLogin = () => {
    if (localStorage.getItem("userInfo") == null)
        return false;
    return true;
}

export const getUserTokens = () => JSON.parse(localStorage.getItem("userInfo"));
export const getUserAccessToken = () => getUserTokens().access_token;

export const logOut = () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        timeout: 1000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getUserTokens().access_token,
        }
    });

    axiosInstance.post('/sessions/logout')
        .then(response => {
            console.log("The response to /logout was...");
            console.log(response);
        })
        .catch(error => {
            console.log("An error has occurred when post to /logout...");
            console.log(error);
        });

    localStorage.removeItem("userInfo");
}

export const getUserEmailFromLocalStorage = () => {
    const idToken = getUserTokens().id_token;
    const idTokenDecoded = jwtDecode(idToken);
    const email = idTokenDecoded.email;
    return email;
}

export const getUserTypeFromLocalStorage = () => {
    const idToken = getUserTokens().id_token;
    const idTokenDecoded = jwtDecode(idToken);
    const userType = idTokenDecoded.user_type;
    return userType;
}