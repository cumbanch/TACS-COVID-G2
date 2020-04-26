import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import DashboardComponent from './dashboard'
import Authorizationcomponent from './authorization'
import NavBarComponent from './navBarCov'
const AppComponent = (props) => {

    const [params, setparams] = useState({ isUserLogged: props.isUserLogged });
    const apiCheckIfUserIsLogged = () => true;
    const properDashboard = params.isUserLogged ?
        <DashboardComponent /> : <Authorizationcomponent />;

    return (
        <div className="App">
            <NavBarComponent />
            {properDashboard}
        </div>

    );
}

export default AppComponent;