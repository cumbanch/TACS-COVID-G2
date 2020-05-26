import React, { useState } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
}));

const getAccessToken = () => {
    const tokens = JSON.parse(localStorage.getItem('userInfo'));
    return tokens.access_token;
}

export default function DropMenuComponent() {
    const classes = useStyles();
    const [date, setDate] = useState('T');
    const [open, setOpen] = useState(false);

    const handleChange = async (event) => {
        setDate(event.target.value);
        // Acá debería hacer el request al back para traer la info
        const response = await axios.get(
            "http://localhost:8080/countries/",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'https://localhost:8080',
                    'Authorization': getAccessToken(),
                }
            })
        console.log(response.data);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={date}
                    onChange={handleChange}
                >
                    <MenuItem value={"T"}>Hoy</MenuItem>
                    <MenuItem value={"L3D"}>En los últimos 3 días</MenuItem>
                    <MenuItem value={"LW"}>En la última semana</MenuItem>
                    <MenuItem value={"LM"}>En el último mes</MenuItem>
                    <MenuItem value={"OT"}>Desde el inicio de los tiempos</MenuItem>
                </Select>
            </FormControl>
            <h5>Resultado: {date}</h5>
        </div>
    );
}