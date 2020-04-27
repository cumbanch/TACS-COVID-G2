import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import NavBarComponent from '../dashboards/navBarCov'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";
import GraphicsComponent from '../dashboards/graphics-dashboard'
import UsersComponent from '../dashboards/users-dashboards'
import CountriesComponent from '../dashboards/countries-dashboard'
import "../../assets/sass/burger-menu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { elastic as Menu } from 'react-burger-menu';
import MenuItemComponent from '../dashboards/menuItem'
const AppComponent = (props) => {
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const [params, setparams] = useState({ isUserLogged: props.isUserLogged });
    return (
        <div className="App" id="root">

            <Menu outerContainerId={"root"} pageWrapId={"navCovid"}  >
                <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" />
                <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAFICOS" />
                <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/countries" aTitle="PAISES" />
            </Menu>


            <NavBarComponent id="navCovid" />


            <Switch>
                <Route exact path='/' component={SignInComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/graphics" component={GraphicsComponent} />
                <Route path="/users" component={UsersComponent} />
                <Route path="/countries" component={CountriesComponent} />
                <Route path="/home" component={HomeComponent} />
            </Switch>
        </div>

    );
}

export default AppComponent;