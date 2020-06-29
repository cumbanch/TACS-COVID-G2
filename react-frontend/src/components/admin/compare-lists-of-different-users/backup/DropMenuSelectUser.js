import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { getUserAccessToken } from '../../../session-managment/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DropMenuSelectList from './DropMenuSelectList';

const arrowRightIcon = <FontAwesomeIcon icon={faArrowRight} />
const arrowLeftIcon = <FontAwesomeIcon icon={faArrowLeft} />

export default function DropMenuSelectUser(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [users, setUsers] = useState([]);
    const [userMailSelected, setUserMailSelected] = useState("Select the first user");
    const [userIdSelected, setUserIdSelected] = useState(0);
    const [flag, setFlag] = useState(false);

    const handleClick = (event) => {
        flag ? setAnchorEl(null)
            : setAnchorEl(event.currentTarget)
    };

    const handleClickArrowRight = () => {
        setFlag(true);
    }

    const handleClickArrowLeft = () => {
        setFlag(false);
    }

    const handleSelectUserEmailAndClose = (user) => {
        setAnchorEl(null);
        setUserMailSelected((previousState) => {
            return (user.email ? user.email : previousState);
        });
        setUserIdSelected(user.id);
    };

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
    }, []);

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {userMailSelected}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleSelectUserEmailAndClose}
            >
                {users.map(user => {
                    return <MenuItem key={user.id} onClick={() => handleSelectUserEmailAndClose(user)}>{user.email}</MenuItem>
                })}
            </Menu>
            {
                userMailSelected !== "Select the first user" ?
                    <span onClick={handleClickArrowRight}>{arrowRightIcon}</span> : null
            }
            <span onClick={handleClickArrowLeft}>{arrowLeftIcon}</span>
            {flag ? <DropMenuSelectList userId={userIdSelected} /> : null}
        </div>
    );
}
