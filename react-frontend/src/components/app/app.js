import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import "../../assets/sass/burger-menu.css"
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import MenuItemComponent from './menuItem'
function AppComponent() {
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    return (
        <div id="page-wrap">
            <Router>
                <div className="App">
                    <Menu pageWrapId={"inner-container"} outerContainerId={"page-wrap"} >
                        <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" />
                        <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAFICOS" />
                        <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/countries" aTitle="PAISES" />

                    </Menu>
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
        </div >
    );
}

export default AppComponent;