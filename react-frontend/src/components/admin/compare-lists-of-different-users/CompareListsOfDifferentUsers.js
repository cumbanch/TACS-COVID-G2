import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ControlledTreeView from './ControlledTreeView';
import { getUserAccessToken } from '../../session-managment/utils';

const fetchUsers = async () => {
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getUserAccessToken(),
        }
    });
    const response = await axiosInstance.get('/users?page=1&limit=100&order_column=id&order_type=ASC');
    const listOfUsers = response.data.data;
    return listOfUsers;
}

const CompareListsOfDifferentUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(
        async () => {
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_BASE_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getUserAccessToken(),
                }
            });
            const response = await axiosInstance.get('/users?page=1&limit=100&order_column=id&order_type=ASC');
            const listOfUsers = response.data.data;
            setUsers(listOfUsers);
        }, []
    );

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                {
                    console.log("users inside return")
                }
                {
                    console.log(users)
                }
                <ControlledTreeView listOfUsers={users} />
                <br />
                <ControlledTreeView listOfUsers={users} />
            </div>
        </div>
    )
}

export default CompareListsOfDifferentUsers;