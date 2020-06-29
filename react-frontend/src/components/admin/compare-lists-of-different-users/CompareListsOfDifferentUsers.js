import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SelectAnUser from './SelectAnUser';
import SelectAList from './SelectAList';
import CountriesInCommon from './CountriesInCommon';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const getSteps = (firstUser, firstList, secondUser, secondList) => {
    return [
        `Select the first user ${firstUser.email ? firstUser.email : ''}`,
        `Select the first list ${firstList.name ? firstList.name : ''}`,
        `Select the second user ${secondUser.email ? secondUser.email : ''}`,
        `Select the second list ${secondList.name ? secondList.name : ''}`,
    ];
}

export default function CompareListsOfDifferentUsers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [firstUserSelected, setFirstUserSelected] = useState({});
    const [firstListSelected, setFirstListSelected] = useState({});
    const [secondUserSelected, setSecondUserSelected] = useState({});
    const [secondListSelected, setSecondListSelected] = useState({});
    const steps = getSteps(
        firstUserSelected,
        firstListSelected,
        secondUserSelected,
        secondListSelected
    );

    const oneStepForward = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const handleNextSelectFirstUser = (user) => {
        oneStepForward();
        setFirstUserSelected(user);
    };

    const handleNextSelectFirstList = (list) => {
        oneStepForward();
        setFirstListSelected(list);
    };

    const handleNextSelectSecondUser = (user) => {
        oneStepForward();
        setSecondUserSelected(user);
    };

    const handleNextSelectSecondList = (list) => {
        oneStepForward();
        setSecondListSelected(list);
    };

    const handleBack = () => {
        const oneStepBackward = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

        switch (activeStep) {
            case 1:
                oneStepBackward();
                setFirstUserSelected({});
                break;
            case 2:
                oneStepBackward();
                setFirstListSelected({});
                break;
            case 3:
                oneStepBackward();
                setSecondUserSelected({});
                break;
            case 4:
                oneStepBackward();
                setSecondListSelected({});
                break;
            default:
                break;
        }
    };

    const handleReset = () => {
        setActiveStep(0);
        setFirstUserSelected({});
        setFirstListSelected({});
        setSecondUserSelected({});
        setSecondListSelected({});
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SelectAnUser handleNext={handleNextSelectFirstUser} userToExclude={{}} />;
            case 1:
                return <SelectAList userSelected={firstUserSelected} handleNext={handleNextSelectFirstList} />;
            case 2:
                return <SelectAnUser handleNext={handleNextSelectSecondUser} userToExclude={firstUserSelected} />;
            case 3:
                return <SelectAList userSelected={secondUserSelected} handleNext={handleNextSelectSecondList} />;
            default:
                return 'Unknown step';
        }
    }

    return (
        <div className="auth-wrapper-table">
            <div className="auth-inner-table">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent>
                                    <Typography component="span" variant="body2">{getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>
                                <CountriesInCommon firstList={firstListSelected} secondList={secondListSelected} />
                            </Typography>
                            <br />
                            <Button
                                onClick={handleReset}
                                color="primary"
                                className={classes.button}
                                variant="contained">
                                Reset
                            </Button>
                        </Paper>
                    )}
                </div>
            </div>
        </div >
    );
}

