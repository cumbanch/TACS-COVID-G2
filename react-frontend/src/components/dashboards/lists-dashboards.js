import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';


const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    maxWidth: '650px',
    paddingTop: '100px',
    margin: 'auto',
  },
  listDashboard: {
    paddingTop: '50px',
  },
  listItem: {
    fontSize: 'x-large'
  }
}));

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
  
  const closeModal = () => {
    setParams(Object.assign({}, params, { newCountry: undefined }));
    setParams(Object.assign({}, params, { openDialog: false }));
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
    if (params.newListCountries.length === 0){
      errors.listItems = "Debe seleccionar al menos un país"
    }

    return errors;
  };

  return (
    <div className={"container layout-dashboard " + classes.listDashboard}>
        <h1>
          Mis Listas
        </h1>
        <List>
          {params.listItems.map((row) => (
            <ListItem button component={Link} to={"/list/" + row.id}  key={row.id}>
              <ListItemText classes={{primary:classes.listItem}}
                primary={row.name}
              />
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText classes={{primary:classes.listItem}}>
            <Link to="/new-list">
                + Agregar nueva lista...
              </Link>
              </ListItemText>
          </ListItem>
        </List>
    </div>

  );
}
export default ListsComponent;
