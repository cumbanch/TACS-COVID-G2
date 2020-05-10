import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: '100px',
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
  },
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
      <div className="content">
      <h1 className="float-left">
        Norteamérica    
      </h1>

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
