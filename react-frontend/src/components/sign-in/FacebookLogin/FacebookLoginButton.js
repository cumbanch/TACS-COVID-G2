import React, { useState } from 'react'
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookLoginButton = () => {

    let userInfo = {
        isLoggedIn: false,
        accessToken: '',
        userID: '',
        name: '',
        email: '',
    };

    const responseFacebook = (response) => {
        if (response.status !== "unknown") {
            userInfo = {
                isLoggedIn: true,
                accessToken: response.accessToken,
                userID: response.userID,
                name: response.name,
                email: response.email,
            };
        }

        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            timeout: 1000,
            headers: {
                'Content-Type': 'application/json',
                'x-external-access-token': userInfo.accessToken,
                'x-external-provider-name': 'facebook',
            }
        });

        axiosInstance.post('/sessions/external_login')
            .then(response => {
                console.log("The response to /external_login was...");
                console.log(response);
                if (response.status == 200) {
                    localStorage.setItem('userInfo', JSON.stringify(response.data));
                }
            })
            .catch(error => {
                console.log("An error has occurred when post to /external_login...");
                console.log(error);
            });
    }

    let fbContent;

    if (userInfo.isLoggedIn) {
        fbContent = (
            <div>
                {userInfo.email}
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