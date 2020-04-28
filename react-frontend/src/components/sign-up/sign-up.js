import React, { useState } from "react";
import { ValidatorForm } from 'react-form-validator-core';
import { Redirect } from 'react-router-dom';
import useSignUpForm from '../../hooks/custom-hooks';
import ValidatableField from '../validation/validatable-field';
import { SignUp } from '../../services/sessions';

const SignUpComponent = () => {

    const [redirect, setRedirect] = useState('');

    const signUp = () => {
        return SignUp(inputs)
            .then((res) => {
                setRedirect('/sign-in');
            })
            .catch(alert);
    }

    const { inputs, handleInputChange, handleSubmit } = useSignUpForm(
        { firstName: '', lastName: '', email: '', password1: '', password2: '' }, signUp
    );

    ValidatorForm.addValidationRule('passwordMatch', (value) => {
        return value === inputs.password1;

    });
    const formRedirect = redirect ? <Redirect to={redirect} /> :

        <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
        >
            <h3>Sign up</h3>

            <div className="form-group">
                <label>First name</label>
                <ValidatableField
                    onChange={handleInputChange}
                    label='First name'
                    placeholder='First name'
                    name="firstName"
                    value={inputs.firstName}
                    validators={['required', 'matchRegexp:^[A-Za-zÀ-ÖØ-öø-ÿ ]*$']}
                    errorMessages={['This field is required', 'First name is not valid']}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <ValidatableField
                    onChange={handleInputChange}
                    label='Last name'
                    placeholder='Last name'
                    name="lastName"
                    value={inputs.lastName}
                    validators={['required', 'matchRegexp:^[A-Za-zÀ-ÖØ-öø-ÿ ]*$']}
                    errorMessages={['This field is required', 'Last name is not valid']}
                    type="text"
                    className="form-control"
                />
            </div>

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
                    name="password1"
                    value={inputs.password1}
                    validators={['required', 'isString']}
                    errorMessages={['This field is required', 'Password is not valid']}
                    type="password"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label>Confirm password</label>
                <ValidatableField
                    onChange={handleInputChange}
                    label='Confirm password'
                    placeholder='Password'
                    name="password2"
                    value={inputs.password2}
                    validators={['required', 'isString', 'passwordMatch']}
                    errorMessages={['This field is required', 'Password is not valid', 'Passwords do not match']}
                    type="password"
                    className="form-control"
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered? <a href={"/sign-in"}>Sign in!</a>
            </p>

        </ValidatorForm>

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                {formRedirect}

            </div> </div>
    );
}

export default SignUpComponent;