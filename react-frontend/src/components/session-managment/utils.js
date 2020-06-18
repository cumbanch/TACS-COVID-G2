import jwtDecode from "jwt-decode";
import axios from 'axios';

export const regularUser = "regular";
export const adminUser = "admin";

export const getIfUserIsLogged = () => {
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
            'Authorization': getUserAccessToken(),
        }
    });

    axiosInstance.post('/sessions/logout')
    localStorage.removeItem("userInfo");
}

export const getUserEmailFromLocalStorage = () => {
    const idToken = getUserTokens().id_token;
    const idTokenDecoded = jwtDecode(idToken);
    const email = idTokenDecoded.email;
    return email;
}

export const getUserTypeFromLocalStorage = () => {
    try {
        const idToken = getUserTokens().id_token;
        const idTokenDecoded = jwtDecode(idToken);
        const userType = idTokenDecoded.user_type;
        return userType;
    } catch {
        return null;
    }
}