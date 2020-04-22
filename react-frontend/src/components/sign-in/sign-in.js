import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {ValidatorForm} from "react-form-validator-core";
import ValidatableField from "../validation/validable-field";
import useSignUpForm from "../sign-up/hooks/custom-hooks";
import {SignIn} from "../../services/sessions";

const SignInComponent = () => {

    const signIn = () => {
        return SignIn(inputs)
            .then((res) => {
                setRedirect('/home');
            })
            .catch(alert);
    }

    const {inputs, handleInputChange, handleSubmit} = useSignUpForm(
        {email: '', password: ''}, signIn
    );

    const [redirect, setRedirect] = useState('');

    return (
        redirect ? <Redirect to={redirect}/> :
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
    );
}


export default SignInComponent;