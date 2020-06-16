import React, { useState } from 'react'
import TreeItem from '@material-ui/lab/TreeItem';
import axios from 'axios';
import { getUserAccessToken } from '../../../session-managment/utils';

const MyTreeItem = (props) => {
    const [userLists, setUserLists] = useState([]);

    const handleUserClick = (event, userId) => {
        event.preventDefault();
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchASpecificUser = async () => {
            const result = await axiosInstance.get(`/users/${props.user.id}`);
            setUserLists(result.data.lists);
        }
        fetchASpecificUser();
    }
    return (
        <TreeItem nodeId={props.user.id} label={props.user.email} onIconClick={handleUserClick}>
            {
                userLists.map(list => {
                    return (
                        <MyTreeItem nodeId={list.id} label={list.name} />
                    )
                })
            }
        </TreeItem>
    )
}

export default MyTreeItem;