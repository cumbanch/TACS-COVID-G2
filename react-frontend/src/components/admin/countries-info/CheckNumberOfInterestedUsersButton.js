import React, { useState } from 'react';
import axios from 'axios';
import { getUserAccessToken } from '../../session-managment/utils'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const CheckNumberOfInterestedUsersButton = (props) => {

    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);

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
            const result = await axiosInstance.get(`/countries/${props.idCountry}/interested_users`);
            setAmount(result.data.amount);
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
                <DialogTitle id="alert-dialog-title">{`Number of interested users about ${props.countryName}(${props.iso2})`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`The number of users that follows ${props.countryName} at`}
                        {` ${(new Date).toTimeString()} is ${amount}`}
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

export default CheckNumberOfInterestedUsersButton;

