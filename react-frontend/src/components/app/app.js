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
const AppComponent = (props) => {

    const [params, setparams] = useState({ isUserLogged: props.isUserLogged });
    return (
        <div className="App">
            <NavBarComponent />
            {/* {properDashboard} */}
            <div className="auth-wrapper">
                <div className="auth-inner">
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
            </div>
        </div>

    );
}

export default AppComponent;