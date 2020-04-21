import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import "../../assets/sass/burger-menu.css"
import Login from '../login/login';
import SignUp from '../sign-up/sign-up';

function App() {
    const showSettings = (event) => event.preventDefault();
    return (
        <div id="outer-container">
            <Menu pageWrapId={"page-wrap"} outerContainerId={"App"} >
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={showSettings} className="menu-item--small" href="">Settings</a>
            </Menu>
            <main id="page-wrap">
                <Router >
                    <div className="App">
                        <nav className="navbar navbar-expand-lg navbar-light" >
                            <div className="container" style={{ position: "sticky" }}>
                                <Link className="navbar-brand" to={"/sign-in"}>Covid 19 - TACS - G2</Link>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className="auth-wrapper" >
                            <div className="auth-inner">
                                <Switch>
                                    <Route exact path='/' component={Login} />
                                    <Route path="/sign-in" component={Login} />
                                    <Route path="/sign-up" component={SignUp} />
                                </Switch>
                            </div>
                        </div>
                    </div>

                </Router>
            </main>


        </div >

    );
}

export default App;