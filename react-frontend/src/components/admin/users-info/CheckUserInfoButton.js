import React, { useState } from 'react';
import axios from 'axios';
import { getUserAccessToken } from '../../session-managment/utils'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListsCountriesTable from './ListsCountriesTable';

const CheckUserInfoButton = (props) => {

    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchData = async () => {
            const result = await axiosInstance.get(`/users/${props.userId}`);
            setUserInfo(result.data.lists);
        }
        fetchData();
        setOpen(true);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Check
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`User: ${props.userEmail}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <ListsCountriesTable lists={userInfo} />
                        Total registered lists: {userInfo.length}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CheckUserInfoButton;

