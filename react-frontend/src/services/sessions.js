import bcrypt from 'bcryptjs';

const axios = require('axios').default;

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

const salt = 10;

const hashPassword = (password) => {
    return bcrypt.hash(password, salt);
}


export const SignUp = (attributes) => {
    return hashPassword(attributes.password1)
        .then(hash => {
            return axiosInstance.post('/users',
                JSON.stringify(
                    {
                        'name': attributes.firstName,
                        'last_name': attributes.lastName,
                        'email': attributes.email,
                        'password': hash
                    }
                ));
        });
}

export const SignIn = (attributes) => {
    return hashPassword(attributes.password)
        .then(hash => {
            console.log(hash);
            return axiosInstance.post('/sessions/login',
                JSON.stringify(
                    {
                        'email': attributes.email,
                        'password': hash
                    }
                ));
        });
}