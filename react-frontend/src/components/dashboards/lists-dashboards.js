import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Dialog from '@material-ui/core/Dialog';
import { ValidatorForm } from "react-form-validator-core";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ValidatableField from "../validation/validatable-field";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';
import FlagIcon from '@material-ui/icons/Flag';
import AddCountryDialog from '../lists/addCountry';
import { useFormik } from 'formik';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: '650px',
    paddingTop: '100px',
    margin: 'auto',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  listItem: {
    fontSize: 'x-large'
  }
}));

const rows = [
  createData(0, 'Países Occidente'),
  createData(1, 'Países Oriente'),
  createData(2, 'Norteamérica'),
];

function createData(id, name) {
  return { id, name };
}

const ListsComponent = (props) => {
  const classes = useStyles();
  
  const [params, setParams] = useState({
    editMode: false,
    listItems: [],
    newListCountries: [],
    openDialog: false,
    openCountryDialog: false,
    selectedCountry: undefined,
  });
  
  const handleInputChange = (event) => {
    setParams(Object.assign({}, params, { newCountry: event.target.value }));
  }

  const handleSubmit = (values) => {
    const listName = values.listName;
    let response = postList(listName);
    setParams(Object.assign({}, params, { newListCountries: [] }));
    closeModal();
    window.location.reload(false);
  }
  
  const closeModal = () => {
    setParams(Object.assign({}, params, { newCountry: undefined }));
    setParams(Object.assign({}, params, { openDialog: false }));
  }
  
  const openModal = () => {
    setParams(Object.assign({}, params, { openDialog: true }));
  }

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getUserAccessToken(),
    }
  });

  const postList = async (listName) => {
    try {
    const response = await axiosInstance.post('/lists',
      JSON.stringify(
        {
          'name': listName,
          'countries': params.newListCountries.map((country) => (country.id)),
        }
      ));
    return response;
    } catch (error){
      if (error.response)
        alert(error.response.data.message);
      else 
        alert("Error desconocido")
    }

  }
  
  const getUserLists = async () => {
    try {
      const response = await axiosInstance.get('/lists');
      const listOfLists = response.data.data;
      setParams(Object.assign({}, params, { listItems: listOfLists }));
    } catch (error){
      if (error.response)
        alert(error.response.data.message);
      else 
        alert("Error desconocido")
    }
  }

  useEffect(() => {

    getUserLists();
  }, [])
  
  const validate = values => {
    const errors = {};
    if (!values.listName) {
      errors.listName = 'Required';
    } 
    if (params.newListCountries.length == 0){
      errors.listItems = "Debe seleccionar al menos un país"
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      listName: '',
    },
    validate,
    onSubmit: values => {
      handleSubmit(values);
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  const addCountry = (country) => {
    let countryList = params.newListCountries;
    countryList.push(country);
    setParams(Object.assign({}, params, { newListCountries: countryList }));
  }

  const openCountryModal = () => {
    setParams(Object.assign({}, params, { openCountryDialog: true }));
  }
  
  const closeCountryModal = () => {
    setParams(Object.assign({}, params, { openCountryDialog: false }));
  }

  return (
    <div className="container layout-dashboard" style={{backgroundColor: "#1C8EF9"}}>
      <Paper className={classes.paper}>
        <h1>
          Mis Listas
        </h1>
        <List>
          {params.listItems.map((row) => (
            <ListItem button component={Link} to={"/list/" + row.id}>
              <ListItemText classes={{primary:classes.listItem}}
                primary={row.name}
              />
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
              <ListItem
                onClick={openModal}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faPlus} />
                </ListItemIcon>
                <ListItemText classes={{primary:classes.listItem}}
                  primary="Crear nueva lista..."

                />
              </ListItem>
        </List>
      </Paper>

      <Dialog open={params.openDialog} onClose={closeModal} aria-labelledby="form-dialog-title">
        <Paper className={classes.addCountry}>


          <div>
            <DialogTitle id="new-list-dialog">Agregar nueva lista...</DialogTitle>
            <DialogContent>
              <form onSubmit={formik.handleSubmit}>
                <input
                  id="listName"
                  name="listName"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.listName}
                />
                {formik.errors.listName ? <div>El campo nombre es requerido</div> : null}

                <List>
                  {params.newListCountries.map((row) =>(
                    <ListItem>
                      <ListItemIcon>
                        <FlagIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={row.name}
                      />
                    </ListItem>
                  ))}
                </List>
                <label onClick={openCountryModal} className="btn btn-primary">Agregar país...</label>
                {formik.errors.listItems ? <div>Debe seleccionar al menos un país</div> : null}
                <AddCountryDialog openCountryDialog={params.openCountryDialog} addCountry={addCountry} closeCountryModal={closeCountryModal}/>

                <DialogActions>
                  <label onClick={closeModal} className="btn">Cancelar</label>
                  <button type="submit" className="btn btn-primary">Crear</button>
                </DialogActions>

              </form>
            </DialogContent>
          </div>

        </Paper>
      </Dialog>


    </div>

  );
}
export default ListsComponent;
