import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlagIcon from '@material-ui/icons/Flag';
import AddCountryDialog from '../lists/addCountry';
import { useFormik } from 'formik';
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';
import { Prompt } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Link } from "react-router-dom";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: '40px',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperContainer: {
    display: "flex",
    flexDirection: "column",
    width: "72%",
    marginLeft: "14%",
  },
  stepContent: {
    width: "73%",
    alignSelf: "center",
  },
  firstStepContainer: {
    display: "flex",
    flexDirection: "column",
    width: "85%",
    padding: "16px",
    margin: "auto",
  },
  firstStepLabel: {
    alignSelf: "flex-start",
  },
  secondStepContainer: {
    borderWidth: "5px",
    borderColor: "lightgrey",
    borderRadius: "1px",
    borderStyle: "solid",
    backgroundColor: "lightgray",
  },
  secondSteplistItem: {
    backgroundColor: "white",
    marginBottom: "5px",
  },
  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
  },
  stepButton: {
    fontSize: "x-large",
  },
  listName: {
    borderStyle: "none",
    background: "transparent",
    textAlign: "center",
    fontSize: "xx-large",
    color: "black",
  },
  list: {
    margin: "20px",
  },
  warning: {
    color: "red",
  },
}
));

function getSteps() {
  return ['Nombre', 'Países', 'Confirmación'];
}


const NewListComponent = (props) => {
  const classes = useStyles();
  const [params, setParams] = React.useState({
    openCountryDialog: false,
    listName: "",
    successfulCreatedListDialog: false,
    createdList: false,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [countries, setCountries] = React.useState([]);
  const steps = getSteps();


  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return getFirstStep();
      case 1:
        return getSecondStep();
      case 2:
        return getThirdStep();
      default:
        return 'Unknown stepIndex';
    }
  }
  const getFirstStep = () => {
    return <div className={classes.firstStepContainer}>
      <label className={classes.firstStepLabel}>Nombre de la lista</label>
      <input
        id="listName"
        name="listName"
        type="text"
        value={params.listName}
        onChange={(event) => setParams(Object.assign({}, params, { listName: event.target.value }))}
      />
    </div>
}
  const addCountry = (country) => {
    let countryList = countries;
    countryList.push(country);
    setCountries(countryList);
  }

  const openCountryModal = () => {
    setParams(Object.assign({}, params, { openCountryDialog: true }));
  }
  
  const closeCountryModal = () => {
    setParams(Object.assign({}, params, { openCountryDialog: false }));
  }



  const getSecondStep = () => {
    return <div>
      <Button onClick={openCountryModal} variant="outlined"> + Agregar país...</Button>
      <div style={{margin: "24px"}}>
      {countries.length > 0 ? 
        <div className={classes.secondStepContainer}>
          <List style={{padding: "0px"}}>
            {countries.map((row) =>(
              <ListItem className={classes.secondSteplistItem}  key={row.id}>
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                <ListItemText
                  primary={row.name}
                />
              </ListItem>
            ))}

          </List>
        </div>
        : null}
      <AddCountryDialog openCountryDialog={params.openCountryDialog} addCountry={addCountry} closeCountryModal={closeCountryModal}/>
      </div>

    </div>
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
            'name': params.listName,
            'countries': countries.map((country) => (country.id)),
          }
        ));
      setParams(Object.assign({}, params, { successfulCreatedListDialog: true, createdList: true }));
      return response;
    } catch (error){
      if (error.response)
        alert(error.response.data.message);
      else 
        alert("Error desconocido")
    }
  }
  
const getThirdStep = () => {
  return  <div>
    <form onSubmit={formik.handleSubmit}>
      <input className={classes.listName}
        id="listName"
        name="listName"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.listName}
        disabled="disabled"
      />
      {countries.length > 0 ? 
        <Paper elevation={3} className={classes.list}>
          <List>
            {countries.map((row) =>(
              <ListItem key={row.id}>
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                <ListItemText
                  primary={row.name}
                />

              </ListItem>
            ))}
          </List>
        </Paper>
        : null}
      <div style={{display: "grid"}}>
        {formik.errors.listItems || !countries.length ? <label className={classes.warning}>Debe seleccionar al menos un país</label> : null}
        {formik.errors.listName || !params.listName ? <label  className={classes.warning}>Debe asignar un nombre a la lista</label> : null}
      </div>
      <button type="submit" className="btn btn-primary">Crear Lista</button>
    </form>
      <Dialog
        open={params.successfulCreatedListDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La lista se creó exitosamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
              <Link to="/lists">
            Volver a Mis Listas
              </Link>

          </Button>
        </DialogActions>
      </Dialog>
  </div>
}


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validate = values => {
    const errors = {};
    if (!values.listName) {
      errors.listName = 'Required';
    } 
    if (countries.length === 0){
      errors.listItems = "Debe seleccionar al menos un país"
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      listName: params.listName,
    },
    validate,
    enableReinitialize: true,
    onSubmit: values => {
      postList();
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  const leftIcon = <FontAwesomeIcon icon={faArrowLeft} />
  const rightIcon = <FontAwesomeIcon icon={faArrowRight} />

  return (
    <div className={"container layout-dashboard " + classes.root}>
      <h2>Nueva lista</h2>
      <Prompt
        when={!params.createdList && (params.listName !== "" || countries.length !== 0)}
        message="Hay cambios sin guardar, deseas salir de la página?"
      />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          null
        ) : (
          <div className={classes.stepperContainer}>
            <div className={classes.stepContent}>
              {getStepContent(activeStep)}
            </div>
            <div className={classes.buttonContainer}>
              <Button
                onClick={handleBack}
                className={classes.stepButton}
                style={{visibility: activeStep === 0 ? 'hidden' : 'visible'}}
              >
                {leftIcon}
              </Button>
              <Button variant="contained" 
                style={{backgroundColor: "#167bff", 
                  color: "white", 
                  visibility: activeStep === steps.length - 1 ? 'hidden' : 'visible'}} 
                onClick={handleNext} className={classes.stepButton}>
                {rightIcon}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewListComponent;
