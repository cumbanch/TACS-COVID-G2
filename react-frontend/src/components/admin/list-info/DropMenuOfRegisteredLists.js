import React, { useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { differenceInDays, subDays } from 'date-fns';
import { getUserAccessToken } from '../../session-managment/utils';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

const DropMenuOfRegisteredLists = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(0);
    const [openWindowDialog, setOpenWindowDialog] = useState(false);
    const originOfTime = new Date(2020, 0, 1);

    const handleChange = async (event) => {
        setSelectedDate(event.target.value);
        const days = differenceInDays(new Date(), selectedDate);
        const axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getUserAccessToken(),
            }
        });

        const fetchData = async () => {
            const response = await axiosInstance.get(`/lists?last_days_to_check=${days}`);
            const listsOfListOfCountries = response.data.data;
            const amountOfLists = listsOfListOfCountries.length;
            setAmount(amountOfLists);
        }
        fetchData();
        setOpenWindowDialog(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseWindowDialog = () => {
        setOpenWindowDialog(false);
    };

    return (
        <div align="center">
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selectedDate}
                    onChange={handleChange}
                >
                    <MenuItem value={new Date()}>Today</MenuItem>
                    <MenuItem value={subDays(new Date(), 3)}>In the last 3 days</MenuItem>
                    <MenuItem value={subDays(new Date(), 7)}>In the last week</MenuItem>
                    <MenuItem value={subDays(new Date(), 30)}>In the last month</MenuItem>
                    <MenuItem value={originOfTime}>From the beginning</MenuItem>
                </Select>
            </FormControl>
            <Dialog
                open={openWindowDialog}
                onClose={handleCloseWindowDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Registered lists"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            (new Date).toLocaleDateString("en-US") == selectedDate.toLocaleDateString("en-US") ?
                                `The  number of registered lists today is ${amount}`
                                :
                                `From ${selectedDate.toLocaleDateString("en-US")} to today, the number of registered lists was ${amount}`
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWindowDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DropMenuOfRegisteredLists;