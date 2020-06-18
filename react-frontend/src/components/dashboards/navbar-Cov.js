import React, { useState } from "react";
import { NavLink } from 'react-router-dom'
import { getIfUserIsLogged, logOut } from '../session-managment/utils'
import NavBarUserComponent from '../dashboards/nav-bar-user'
import FacebookLoginButton from '../sign-in/FacebookLogin/FacebookLoginButton'

const NavBarComponent = (props) => {
    const [params, setParams] = useState({ id: props.id });

    const navBar = props.isUserLogged ?
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ zIndex: "900" }} id={params.id}  >
            <div className="container" id="inner-container" >

                <NavLink className="navbar-brand" to={"/"} style={{ textAlign: "right", width: "600px" }}> Covid 19 - TACS - G2 </NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavBarUserComponent />
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/sign-in"} onClick={logOut}>Log out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        :
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ zIndex: "900" }} id={params.id}  >
            <div className="container" id="inner-container" >

                <NavLink className="navbar-brand" to={"/"} style={{ textAlign: "right", width: "600px" }}> Covid 19 - TACS - G2 </NavLink>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/home"}><FacebookLoginButton /></NavLink>
                        </li>
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

    return navBar;

};
export default NavBarComponent;