import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import NavBarComponent from '../dashboards/navbar-Cov'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";
import ComparisonComponent from '../dashboards/comparison-dashboard/comparison-dashboard'
import UsersComponent from '../dashboards/users-dashboards'
import CountriesComponent from '../dashboards/countries-dashboard'
import ListItemComponent from '../lists/list-item'
import "../../assets/sass/burger-menu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faUser, faGlobeAmericas, faList } from '@fortawesome/free-solid-svg-icons'
import { elastic as Menu } from 'react-burger-menu';
import MenuItemComponent from '../dashboards/menu-item'
import ListsComponent from '../dashboards/lists-dashboards'
import PageNotFound from '../dashboards/page-not-found'
import { isUserLogin } from "../session-managment/utils"
import PrivateRoute from "../session-managment/private-route"

const AppComponent = (props) => {
    const chartIcon = <FontAwesomeIcon icon={faChartBar} />
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const countryIcon = <FontAwesomeIcon icon={faGlobeAmericas} />
    const listIcon = <FontAwesomeIcon icon={faList} />
    const isUserLogged = isUserLogin();
    const [params, setparams] = useState({ isUserLogged });
    return (
        <div className="App" id="root">

            <Menu outerContainerId={"root"} pageWrapId={"navCovid"}  >
                <MenuItemComponent anId="Users" anIcon={userIcon} urlRef="/users" aTitle="USUARIOS" />
                <MenuItemComponent anId="Graphics" anIcon={chartIcon} urlRef="/graphics" aTitle="GRAFICOS" />
                <MenuItemComponent anId="Paises" anIcon={countryIcon} urlRef="/countries" aTitle="PAISES" />
                <MenuItemComponent anId="Listas" anIcon={listIcon} urlRef="/lists" aTitle="LISTAS" />
            </Menu>


            <NavBarComponent id="navCovid" isUserLogged={params.isUserLogged} />


            <Switch>
                <Route exact path='/' component={SignInComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/log-out" component={SignUpComponent} />
                <PrivateRoute path="/graphics" component={ComparisonComponent} />
                <PrivateRoute path="/users" component={UsersComponent} />
                <PrivateRoute path="/countries" component={CountriesComponent} />
                <Route path="/lists" component={ListsComponent} />
                <Route path="/list/:id" component={ListItemComponent} />
                <Route path="/home" component={HomeComponent} />
                <Route component={PageNotFound} />
            </Switch>
        </div>

    );
}

export default AppComponent;
