import React, { useState } from 'react'
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

function createData(id, name) {
  return { id, name };
}

const rows = [
  createData(0, 'Países Occidente'),
  createData(1, 'Países Oriente'),
  createData(2, 'Norteamérica'),
];

const ListsComponent = (props) => {
  const classes = useStyles();
  
  const [params, setParams] = useState({
    editMode: false,
    listItems: rows,
    openDialog: false,
  });
  
  const handleInputChange = (event) => {
    setParams(Object.assign({}, params, { newCountry: event.target.value }));
  }

  const handleSubmit = () => {
    let listList = params.listItems;
    listList.push(createData(listList.length + 1, params.newCountry));
    closeModal();
  }
  
  const closeModal = () => {
    setParams(Object.assign({}, params, { newCountry: undefined }));
    setParams(Object.assign({}, params, { openDialog: false }));
  }
  
  const openModal = () => {
    setParams(Object.assign({}, params, { openDialog: true }));
  }

  return (
    <div className="container layout-dashboard" style={{backgroundColor: "#1C8EF9"}}>
      <Paper className={classes.paper}>
        <h1>
          Mis Listas
        </h1>
        <List>
          {rows.map((row) => (
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
          <ValidatorForm
            instantValidate={false}
            onSubmit={handleSubmit}
          >
            <div>
              <DialogTitle id="form-dialog-title">Agregar nueva lista...</DialogTitle>
              <DialogContent>
                <ValidatableField
                  label='Pais'
                  placeholder='Nombre'
                  name="pais"
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </DialogContent>

            </div>
            <DialogActions>
              <label onClick={closeModal} className="btn">Cancelar</label>
              <button type="submit" className="btn btn-primary">Crear</button>
            </DialogActions>
          </ValidatorForm>
        </Paper>
      </Dialog>
    </div>

  );
}
export default ListsComponent;
