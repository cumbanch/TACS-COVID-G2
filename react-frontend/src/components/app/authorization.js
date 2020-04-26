import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";
const AuthorizationComponent = (props) => {
    return (
        <Router>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route exact path='/' component={SignInComponent} />
                        <Route path="/sign-in" component={SignInComponent} />
                        <Route path="/sign-up" component={SignUpComponent} />
                        <Route path="/home" component={HomeComponent} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
export default AuthorizationComponent;