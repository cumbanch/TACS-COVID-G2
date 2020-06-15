import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookLoginButton = () => {

    const [userState, setUserState] = useState({
        isLoggedIn: false,
        accessToken: '',
        userID: '',
        name: '',
        email: ''
    });

    const responseFacebook = (response) => {
        if (response.status !== "unknown") {
            console.log("Facebook login response was ...");
            console.log(response);
            console.log("AccessToken provided by Facebook is...");
            console.log(response.accessToken);
            setUserState({
                isLoggedIn: true,
                accessToken: response.accessToken,
                userID: response.userID,
                name: response.name,
                email: response.email,
            });
            console.log('userState.accessToken');
            console.log(userState.accessToken);
        }

        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                'x-external-access-token': userState.accessToken,
                'x-external-provider-name': 'facebook',
            }
        });

        axiosInstance.post('/sessions/external_login')
            .then(response => {
                console.log("The response to /external_login was...");
                console.log(response);
            })
            .catch(error => {
                console.log("An error has occurred when post to /external_login...");
                console.log(error);
            });
    }

    let fbContent;

    if (userState.isLoggedIn) {
        fbContent = (
            <div>
                {userState.email}
            </div>
        );
    }
    else {
        fbContent = (
            <FacebookLogin
                appId="721629975046207"
                autoLoad={false}
                fields="name,email"
                callback={responseFacebook}
                size="small - small - metro"
            />
        );
    }

    return (
        <div>
            {fbContent}
        </div>
    )
}

export default FacebookLoginButton;