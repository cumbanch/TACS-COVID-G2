import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FlagIcon from '@material-ui/icons/Flag';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';
import AddCountryDialog from '../lists/addCountry';
import { useFormik } from 'formik';

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
    fontSize: 'xx-large',
  },
  editButton: {
    marginTop: '13px',
    alignSelf: 'flex-start',
    marginBottom: '20px',
  },
  editTitle: {
    backgroundColor: 'white',
    borderRadius: '5px',
    fontSize: 'xx-large',
  }
}));

const ListItemComponent = (props) => {
  const classes = useStyles();
  const [params, setParams] = useState({
    editMode: false,
    listName: props.listName,
    listId: props.listId,
    listItems: [],
    openDialog: false,
  });

  const changeMode = () => {
    setParams(Object.assign({}, params, { editMode: !params.editMode }));
  }
  
  const uploadList = async (values) => {
    await axiosInstance.put('/lists/' + params.listId,
      JSON.stringify(
        {
          'name': values.listName,
          'countries': params.listItems.map((country) => (country.id)),
        }
      ));
    setParams(Object.assign({}, params, { listName: values.listName, editMode: !params.editMode }));
  }

  const handleSubmit = (country) => {
    let countryList = params.listItems;
    countryList.push(country);
    setParams(Object.assign({}, params, { listItems: countryList }));
    closeModal();
  }
  
  const removeItem = (id) => {
    let countryList = params.listItems;
    countryList.splice( countryList.findIndex(c => c.id === id) , 1);
    setParams(Object.assign({}, params, { listItems: countryList }));
  }
  
  const closeModal = () => {
    setParams(Object.assign({}, params, { newCountry: undefined }));
    setParams(Object.assign({}, params, { openDialog: false }));
  }
  
  const openModal = () => {
    setParams(Object.assign({}, params, { openDialog: true }));
  }
  
  const [countries, setCountries] = useState([]);
  
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getUserAccessToken(),
      }
    });

  useEffect(() => {

    const fetchData = async () => {
      const response = await axiosInstance.get('/countries?page=1&limit=253');
      const listOfCountries = response.data.data;
      setCountries(listOfCountries);
    }
    
    const getListInfo = async () => {
      const listId = props.location.pathname.split("/").slice(-1)[0];
      const response = await axiosInstance.get('/lists/' + listId);
      const listInfo = response.data;
      const response2 = await axiosInstance.get('/lists/' + listId + '/countries');
      const listItems = response2.data.data;
      setParams(Object.assign({}, params, { listId : listId, listName: listInfo.name, listItems: listItems }));
    }
    fetchData();
    getListInfo();
  }, [])
  
  const validate = values => {
    const errors = {};
    if (!values.listName) {
      errors.listName = 'Required';
    } 
    if (params.listItems.length == 0){
      errors.listItems = "Debe seleccionar al menos un país"
    }
    console.log(errors);
    return errors;
  };
  
  const formik = useFormik({
    initialValues: {
      listName: params.listName,
    },
    validate,
    enableReinitialize: true,
    onSubmit: values => {
      uploadList(values);
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  return (
    <div className="container layout-dashboard" style={{backgroundColor: "#1C8EF9"}}>
      <div className={classes.content}>
        <form onSubmit={formik.handleSubmit}>

          {formik.errors.firstName ? <div>El campo nombre es requerido</div> : null}

          {!params.editMode
            ? <h1 className={classes.title}>{params.listName}</h1>
            : <input
            id="listName"
            name="listName"
            type="text"
            className={classes.editTitle}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.listName}
          />
          }

          <div style={{textAlign: "left"}}>
            {!params.editMode? (
              <div>
                <Button onClick={() => changeMode()}
                  className={classes.editButton} variant="contained">
                  Editar
                </Button>
              </div>
            ): (
              <Button 
                className={classes.editButton} type="submit" variant="contained">
                Guardar
              </Button>
            )}
          </div>
          {formik.errors.listItems ? <div>Seleccione por lo menos un país</div> : null}
        </form>
        <Paper>
          <List>
            {params.listItems.map((row) =>(
              <ListItem>
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                <ListItemText
                  primary={row.name}
                />
                { params.editMode ? 
                  <HighlightOffIcon onClick={() => removeItem(row.id)} /> 
                : null }
              </ListItem>
            ))}

            { params.editMode ? 
              <ListItem
                onClick={openModal}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faPlus} />
                </ListItemIcon>
                <ListItemText
                  primary="Agregar país..."

                />
              </ListItem>
              : null}
          </List>
        </Paper>
      </div>

      <AddCountryDialog openCountryDialog={params.openDialog} addCountry={handleSubmit} closeCountryModal={closeModal}/>
    </div>
  );
}

export default ListItemComponent;
