import React from 'react'
import SignUpComponent from '../sign-up/sign-up';
import { Redirect } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h1>Oops! </h1>
                    <h2>404: Not Found</h2>
                    <p>Sorry, an error has ocurred. Requested page not found!</p>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;
