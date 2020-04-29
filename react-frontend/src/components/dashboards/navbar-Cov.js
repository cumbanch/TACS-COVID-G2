import React, { useState } from "react";
import { NavLink } from 'react-router-dom'

const NavBarComponent = (props) => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ zIndex: "900" }}   >
            <div className="container" id="inner-container" >

                <NavLink className="navbar-brand" to={"/sign-in"} style={{ textAlign: "right", width: "600px" }}> Covid 19 - TACS - G2 </NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/sign-in"}>Sign in</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/sign-up"}>Sign up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
};
export default NavBarComponent;