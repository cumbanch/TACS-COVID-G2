import React, { useState } from 'react'
import axios from 'axios';
import './ListsOfCountriesInfo.css'
import DropMenuOfRegisteredLists from './DropMenuOfRegisteredLists';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { differenceInDays } from 'date-fns';
import { getUserAccessToken } from '../../session-managment/utils';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ListsOfCountriesInfo = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [amount, setAmount] = useState(99);
    const [openWindowDialog, setOpenWindowDialog] = useState(false);
    const originOfTime = new Date(2020, 0, 1);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCloseWindowDialog = () => {
        setOpenWindowDialog(false);
    };

    const handleButtonClick = () => {
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
    }

    return (
        <div className="auth-wrapper">
            <div className="box-content">
                <h2>Number of registered lists</h2>
                <h4>Frequently asked dates</h4>
                <p>Select one of the following options to see the number of registered lists at the date entered</p>
                <DropMenuOfRegisteredLists />
                <br />
                <h4>Select a specific date</h4>
                <p>If you need check another date you can use the follow date-picker. Just select a date in it and
                press the check button to see the number of registered lists from the
                date picked to today.</p>
                <div align="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Select the initial date ..."
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                disableFuture={true}
                                minDate={originOfTime}
                                orientation="landscape"
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <br />
                    <Button onClick={handleButtonClick} variant="contained" color="primary">
                        Check
                    </Button>
                    <Dialog
                        open={openWindowDialog}
                        onClose={handleCloseWindowDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Registered lists"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`From ${selectedDate.toLocaleDateString("en-US")} to today, the number of registered lists was ${amount}`}
                                {console.log("render amount of registered lists")}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseWindowDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default ListsOfCountriesInfo;