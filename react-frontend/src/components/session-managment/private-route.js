import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getIfUserIsLogged } from "./utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            getIfUserIsLogged() ?
                <Component {...props} />
                : <Redirect to="/sign-in" />
        )} />
    )
};

export default PrivateRoute;
