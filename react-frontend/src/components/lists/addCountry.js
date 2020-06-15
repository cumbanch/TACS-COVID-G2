import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ValidatorForm } from "react-form-validator-core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  addCountry: {
    marginTop: '15px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
  },
  title: {
    alignSelf: 'flex-start',
  },
  editButton: {
    alignSelf: 'flex-start',
    marginBottom: '20px',
  }
}));

const AddCountryDialog = (props) => {
  const classes = useStyles();
  
  const [params, setParams] = useState({
    openCountryDialog: props.openCountryDialog,
    newCountry: props.addCountry,
  });
  
  const [selectedCountry, selectCountry] = React.useState({});
  const [countries, setCountries] = useState([]);

  const addNewCountry = () => {
    props.addCountry(selectedCountry);
    console.log(selectedCountry);

    props.closeCountryModal();
  }
  
  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserAccessToken(),
      }
    });


    const fetchData = async () => {
      const response = await axiosInstance.get('/countries?page=1&limit=253');
      const listOfCountries = response.data.data;
      setCountries(listOfCountries);
      console.log(listOfCountries);
    }
    fetchData();
  }, [])

  return (
    <Dialog id="new-country-dialog" open={props.openCountryDialog} onClose={props.closeCountryModal} aria-labelledby="form-dialog-title">
      <Paper className={classes.addCountry}>
        <ValidatorForm
          instantValidate={false}
          onSubmit={addNewCountry}
        >
          <div>
            <DialogTitle>Agregar país</DialogTitle>
            <DialogContent>
              <Autocomplete
                id="country-select"
                value={selectedCountry}
                style={{ width: 300 }}
                options={countries}
                classes={{
                  option: classes.option,
                }}
                onChange={(event, country) => {
                  selectCountry(country);
                }}
                autoHighlight
                autoComplete='new-password'
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    autoComplete='new-password'
                  />
                )}
              />
            </DialogContent>

          </div>
          <DialogActions>
            <label onClick={props.closeCountryModal} className="btn">Cancelar</label>
            <button type="submit" className="btn btn-primary">Agregar</button>
          </DialogActions>
        </ValidatorForm>
      </Paper>
    </Dialog>
  )



}

export default AddCountryDialog;
