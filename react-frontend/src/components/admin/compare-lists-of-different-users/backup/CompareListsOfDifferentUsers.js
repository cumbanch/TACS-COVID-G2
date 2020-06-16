import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ControlledTreeView from './ControlledTreeView';
import { getUserAccessToken } from '../../../session-managment/utils';
// ControlledTreeView imports
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import MyTreeItem from './MyTreeItem';

// CompareListsOfDifferentUsers
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

    useEffect(() => {
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
            setUsers(listOfUsers);
        }
        fetchUsers();
    }, []
    );

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                <ControlledTreeView users={users} />
                <br />
                <ControlledTreeView users={users} />
            </div>
        </div>
    )
}

export default CompareListsOfDifferentUsers;