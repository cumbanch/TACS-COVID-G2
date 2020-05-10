import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Canada', 159, 6.0, 24, 4.0),
  createData('Estados Unidos', 237, 9.0, 37, 4.3),
  createData('Mexico', 262, 16.0, 24, 6.0),
];

const ListItemComponent = (props) => {
  const classes = useStyles();
  
  return (
    <div className="container layout-dashboard">
      <div className={classes.content}>
      <h1 className={classes.title}>
        Norteamérica    
      </h1>
        <Button className={classes.editButton} variant="contained">Editar</Button>

        <Paper>
          <List>

            {rows.map((row) =>(
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


          </div>
      </div>
            );
}

export default ListItemComponent;
