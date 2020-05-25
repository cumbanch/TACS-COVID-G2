import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { ValidatorForm } from "react-form-validator-core";
import ValidatableField from "../validation/validatable-field";
import useSignUpForm from "../../hooks/custom-hooks";
import { SignIn } from "../../services/sessions";
import AlertPasswordIncorrectComponent from "../sign-in/login-incorrect";

const SignInComponent = () => {

    const [passwordIncorrect, setPasswordIncorrect] = useState(false);

    const signIn = () => {
        return SignIn(inputs)
            .then((res) => {
                if (res.status == 200) {
                    console.log(res);
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    localStorage.setItem('userEmail', inputs.email);
                    setRedirect('/home');
                }
                // Falta resolver el caso de login/password incorrecto
            })
            .catch((error) => {
                // alert(error)
                setPasswordIncorrect(true);
                setRedirect('/sign-in');
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
            <AlertPasswordIncorrectComponent loginResult={passwordIncorrect} />
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