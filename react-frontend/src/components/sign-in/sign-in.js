import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { ValidatorForm } from "react-form-validator-core";
import ValidatableField from "../validation/validatable-field";
import useSignUpForm from "../../hooks/custom-hooks";
import { SignIn } from "../../services/sessions";
import AlertPasswordIncorrectComponent from "../sign-in/login-incorrect";
import jwtDecode from "jwt-decode";
import { getUserTypeFromLocalStorage } from '../session-managment/utils';

const setUserPosition = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            localStorage.setItem("lat", position.coords.latitude);
            localStorage.setItem("long", position.coords.longitude);
        }, function (error) {
            alert('ouch');
        })
    }
}

const SignInComponent = (props) => {

    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

    const signIn = () => {
        return SignIn(inputs)
            .then((res) => {
                if (res.status == 200) {
                    setUserPosition();
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    const userType = getUserTypeFromLocalStorage();
                    props.handleLogin(userType);
                    if (userType === "regular")
                        setRedirect('/graphics');
                    else if (userType === "admin") {
                        setUserPosition();
                        setRedirect('/admin/users');
                    }
                }
            })
            .catch((error) => { // Incorrect password (Error 401)
                alert(error)
                setIsPasswordIncorrect(true);
                // setRedirect('/sign-in');
            });
    }

    const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
        { email: '', password: '' }, signIn
    );

    const [redirect, setRedirect] = useState('');
    const formRedirect = redirect ? <Redirect to={redirect} /> :
        <div>
            <ValidatorForm
                onSubmit={handleSubmit}
                instantValidate={false}
            >
                <h3>Sign in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <ValidatableField
                        onChange={handleInputChange}
                        label='Email'
                        placeholder='Email'
                        name="email"
                        value={inputs.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                        type="text"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <ValidatableField
                        onChange={handleInputChange}
                        label='Password'
                        placeholder='Password'
                        name="password"
                        value={inputs.password}
                        validators={['required', 'isString']}
                        errorMessages={['This field is required', 'Password is not valid']}
                        type="password"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign in</button>

            </ValidatorForm>
            <AlertPasswordIncorrectComponent loginResult={isPasswordIncorrect} />
        </div>

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                {formRedirect}
            </div>
        </div>
    );
}


export default SignInComponent;