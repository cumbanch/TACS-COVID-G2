import React, { useState, useEffect } from 'react'
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
import NewListComponent from '../lists/newList'
import PageNotFound from '../dashboards/page-not-found'
import { isUserLogin } from "../session-managment/utils"
import PrivateRoute from "../session-managment/private-route"
import SideMenuComponent from "../side-menu/side-menu"
import UsersInfo from "../admin/users-info/UsersInfo"
import ListsOfCountriesInfo from "../admin/list-info/ListsOfCountriesInfo"
import { getUserTypeFromLocalStorage } from './../session-managment/utils';
import CountriesTable from '../admin/countries-info/CountriesTable';
import CompareListsOfDifferentUsers from '../admin/compare-lists-of-different-users/CompareListsOfDifferentUsers';

const AppComponent = (props) => {

    const [isUserLogged, setIsUserLogged] = useState(false);
    const [userType, setUserType] = useState(null);

    const handleLogin = (anUserType) => {
        setIsUserLogged(true);
        setUserType(anUserType);
    }

    const handleLogout = () => {
        setIsUserLogged(false);
        setUserType(null);
    }

    return (
        <div className="App" id="root">
            <SideMenuComponent userType={userType} />
            <NavBarComponent id="navCovid" isUserLogged={isUserLogged} handleLogout={handleLogout} />

            <Switch>
                <Route exact path='/' render={() => <SignInComponent handleLogin={handleLogin} />} />
                <Route path="/sign-in" render={() => <SignInComponent handleLogin={handleLogin} />} />
                <Route path="/sign-up" component={SignUpComponent} />
                <Route path="/log-out" component={SignUpComponent} />
                <PrivateRoute path="/graphics" component={ComparisonComponent} />
                {/* <PrivateRoute path="/users" component={UsersComponent} /> */}
                <PrivateRoute path="/countries" component={CountriesComponent} />
                <PrivateRoute path="/lists" component={ListsComponent} />
                <PrivateRoute path="/new-list" component={NewListComponent} />
                <PrivateRoute path="/list/:id" component={ListItemComponent} />
                <PrivateRoute path="/home" component={HomeComponent} />
                {/* Admin Routes */}
                <PrivateRoute path="/admin/users" component={UsersInfo} />
                <PrivateRoute path="/admin/compare" component={CompareListsOfDifferentUsers} />
                <PrivateRoute path="/admin/compare" component={PageNotFound} />
                <PrivateRoute path="/admin/countries" component={CountriesTable} />
                <PrivateRoute path="/admin/lists" component={ListsOfCountriesInfo} />
                <Route component={PageNotFound} />
            </Switch>

        </div>

    );
}

export default AppComponent;
