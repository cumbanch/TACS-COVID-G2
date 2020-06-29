import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { getUserAccessToken } from '../../../session-managment/utils';

export default function DropMenuSelectList(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [listNameSelected, setListNameSelected] = useState("Select a list");
    const [lists, setLists] = useState([]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSelectListNameAndClose = (list) => {
        setAnchorEl(null);
        setListNameSelected((previousState) => {
            return (list.name ? list.name : previousState);
        });
    };

    useEffect(() => {
        const fetchLists = async () => {
            const axiosInstance = axios.create({
                baseURL: process.env.REACT_APP_API_BASE_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getUserAccessToken(),
                }
            });
            const response = await axiosInstance.get(`/users/${props.userId}`);
            const listOfUsers = response.data.lists;
            setLists(listOfUsers);
        }
        fetchLists();
    }, []);

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {listNameSelected}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleSelectListNameAndClose}
            >
                {lists.map(list => {
                    return <MenuItem key={list.id} onClick={() => handleSelectListNameAndClose(list)}>{list.name}</MenuItem>
                })}
            </Menu>
        </div>
    );
}
