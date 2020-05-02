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
import NotFoundPage from '../not-found-page/notfoundpage'
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

            // Le paso la prop isUserLogged a NavBarComponent para que pueda
            // decidir si renderizar:
            //      isUserLogged: true -> Muestra LogOut solamente 
            //      isUserLogged: false -> Muestra SignIn y SignUp pero no LogOut
            <NavBarComponent id="navCovid" isUserLogged={params.isUserLogged} />


            <Switch>
                <Route exact path='/' component={SignInComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/graphics" component={GraphicsComponent} />
                <Route path="/users" component={UsersComponent} />
                <Route path="/countries" component={CountriesComponent} />
                <Route path="/home" component={HomeComponent} />
                // Agrego el caso de page not found: todo uri que no sea una de 
                // las anteriores entra en esta
                <Route component={NotFoundPage} />
            </Switch>
        </div>

    );
}

export default AppComponent;