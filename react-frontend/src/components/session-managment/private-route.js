import React from "react"
import { Route, Redirect } from "react-router-dom"
import { isUserLogin } from "./utils";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            isUserLogin() ?
                <Component {...props} />
                : <Redirect to="/sign-in" />
        )} />
    )
};

export default PrivateRoute;
