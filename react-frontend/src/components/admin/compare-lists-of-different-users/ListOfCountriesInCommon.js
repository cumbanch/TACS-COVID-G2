import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const ListOfConuntriesInCommon = ({ countriesInCommon }) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                countriesInCommon.map(country => {
                    return (
                        <ListItem>
                            <ListItemAvatar>
                                <img src={`https://www.countryflags.io/${country.iso_2}/shiny/32.png`} />
                            </ListItemAvatar>
                            <ListItemText primary={country.name} secondary={country.iso_2} />
                        </ListItem>
                    )
                })
            }
        </List>
    );
}

export default ListOfConuntriesInCommon;