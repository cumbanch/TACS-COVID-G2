import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

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

function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Países Occidente', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Países Oriente', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Norteamérica', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
];

const ListsComponent = (props) => {
  const classes = useStyles();

  return (
    <div className="container layout-dashboard">
        <Typography component="h1" variant="h4">
          Mis Listas
        </Typography>
        <List>
          {rows.map((row) => (
            <ListItem button component={Link} to={"/list/"+row.id}>
              <ListItemText classes={{primary:classes.listItem}}
                primary={row.name}
              />
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
    </div>
  );
}
export default ListsComponent;
