import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const NavBarComponent = (props) => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ zIndex: "900" }}   >
                <div className="container" id="inner-container" >
                    <Link className="navbar-brand" to={"/sign-in"} style={{ textAlign: "right", width: "600px" }}> Covid 19 - TACS - G2 </Link>
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
        </Router>
    )
};
export default NavBarComponent;