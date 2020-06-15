import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import NavBarComponent from '../dashboards/navbar-Cov'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignInComponent from '../sign-in/sign-in';
import SignUpComponent from '../sign-up/sign-up';
import HomeComponent from "../home/home";
import ComparisonComponent from '../dashboards/comparison-dashboard/comparison-dashboard'
// import UsersComponent from '../dashboards/users-dashboards'
import CountriesComponent from '../dashboards/countries-dashboard'
import ListItemComponent from '../lists/list-item'
import "../../assets/sass/burger-menu.css"
import ListsComponent from '../dashboards/lists-dashboards'
import PageNotFound from '../dashboards/page-not-found'
import { isUserLogin } from "../session-managment/utils"
import PrivateRoute from "../session-managment/private-route"
import SideMenuComponent from "../side-menu/side-menu"
import UsersInfo from "../admin/UsersInfo"
import ListInfoComponent from "../admin/list-info/list-info"
import { getUserTypeFromLocalStorage } from './../session-managment/utils';
import CountriesTable from '../admin/countries-info/CountriesTable';

const AppComponent = (props) => {

    const isUserLogged = isUserLogin();
    const [params, setparams] = useState({ isUserLogged });

    return (
        <div className="App" id="root">

            <NavBarComponent id="navCovid" isUserLogged={params.isUserLogged} />

            <SideMenuComponent userType={"admin"} />

            <Switch>
                <Route exact path='/' component={SignInComponent} />
                <Route path="/sign-in" component={SignInComponent} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/log-out" component={SignUpComponent} />
                <Route path="/graphics" component={ComparisonComponent} />
                {/* <PrivateRoute path="/users" component={UsersComponent} /> */}
                <PrivateRoute path="/countries" component={CountriesComponent} />
                <Route path="/lists" component={ListsComponent} />
                <Route path="/list/:id" component={ListItemComponent} />
                <Route path="/home" component={HomeComponent} />
                {/* Admin Routes */}
                <Route path="/admin/usuarios" component={UsersInfo} />
                <Route path="/admin/paises" component={CountriesTable} />
                <Route path="/admin/listas" component={PageNotFound} />
                <Route component={PageNotFound} />
            </Switch>

        </div>

    );
}

export default AppComponent;
