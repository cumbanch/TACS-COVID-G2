import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm } from "react-form-validator-core";
import ValidatableField from "../validation/validatable-field";


const useStyles = makeStyles((theme) => ({
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

function createData(name) {
  return { name };
}

let rows = [
  createData('Canada'),
  createData('Estados Unidos'),
  createData('Mexico'),
];

const ListItemComponent = (props) => {
  const classes = useStyles();
  const [params, setParams] = useState({
    editMode: false,
    listName: props.listName,
    listId: props.listId,
    listItems: rows,
  });

  const changeMode = () => {
    setParams(Object.assign({}, params, { editMode: !params.editMode }));
  }

  const handleInputChange = (event) => {
    console.log(params.listItems);
    setParams(Object.assign({}, params, { newCountry: event.target.value }));
  }

  const handleSubmit = () => {
    let countryList = params.listItems;
    countryList.push(createData(params.newCountry))
    setParams(Object.assign({}, params, { listItems: countryList }));
    console.log(params.listItems);
  }

  return (
    <div className="container layout-dashboard">
      <div className={classes.content}>
        <h1 className={classes.title}>
          Norteamérica
        </h1>
        <Button onClick={() => changeMode()}
          className={classes.editButton} variant="contained">
          Editar
        </Button>

        <Paper>
          <List>

            {params.listItems.map((row) =>(
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={row.name}
                />
              </ListItem>
            ))}

          </List>
        </Paper>
        { params.editMode ? 
          <Paper>
            <ValidatorForm
              instantValidate={false}
              onSubmit={handleSubmit}
            >
              <h3 >Agregar país</h3>
              <div className="form-group">
                <label>País</label>
                <ValidatableField
                  label='Pais'
                  placeholder='País'
                  name="pais"
                  type="text"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Agregar</button>
            </ValidatorForm>
          </Paper>
          : null
        }
      </div>
    </div>
  );
}

export default ListItemComponent;
