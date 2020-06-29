import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const NextButton = (props) => {
    const classes = useStyles();
    const handler = () => props.handleNext(props.user);

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handler}
            className={classes.button}
        >
            Select
        </Button >
    )
}

export default NextButton;
