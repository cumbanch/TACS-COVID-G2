import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import "../../assets/sass/burger-menu.css"
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";

function AppComponent() {
    const showSettings = (event) => event.preventDefault();
    return (<Router>
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <Menu pageWrapId={"container"} outerContainerId={"App"} >
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={showSettings} className="menu-item--small" href="">Settings</a>
                </Menu>
                <div className="container">
                    <Link className="navbar-brand" to={"/sign-in"}>Covid 19 - TACS - G2</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

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
        </div></Router>
    );
}

export default AppComponent;