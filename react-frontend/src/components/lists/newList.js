import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlagIcon from '@material-ui/icons/Flag';
import AddCountryDialog from '../lists/addCountry';
import { useFormik } from 'formik';
import axios from 'axios';
import { getUserAccessToken } from '../session-managment/utils';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Prompt } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: '40px',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Nombre', 'Países', 'Confirmación'];
}


const NewListComponent = (props) => {
  const classes = useStyles();
  const [params, setParams] = React.useState({
    openCountryDialog: false,
    listName: "",
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
  return <input
      id="listName"
      name="listName"
      type="text"
      value={params.listName}
      onChange={(event) => setParams(Object.assign({}, params, { listName: event.target.value }))}
    />
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
    return <List>
      {countries.map((row) =>(
        <ListItem>
          <ListItemIcon>
            <FlagIcon />
          </ListItemIcon>
          <ListItemText
            primary={row.name}
          />
          {/*<HighlightOffIcon onClick={() => removeItem(row.id)}/>*/} 
        </ListItem>
      ))}
      <label onClick={openCountryModal} className="btn btn-primary">Agregar país...</label>
      <AddCountryDialog openCountryDialog={params.openCountryDialog} addCountry={addCountry} closeCountryModal={closeCountryModal}/>
    </List>
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
    return response;
    } catch (error){
      if (error.response)
        alert(error.response.data.message);
      else 
        alert("Error desconocido")
    }
  }
  
  const removeItem = (id) => {
    let countryList = countries;
    countryList.splice( countryList.findIndex(c => c.id === id) , 1);
    setCountries(countryList);
  }
  
const getThirdStep = () => {
  return  <div>
    <form onSubmit={formik.handleSubmit}>
      <input
        id="listName"
        name="listName"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.listName}
        disabled="disabled"
      />
      {formik.errors.listName || !params.listName ? <div>El campo nombre es requerido</div> : null}
      <List>
        {countries.map((row) =>(
          <ListItem>
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText
              primary={row.name}
            />

          </ListItem>
        ))}
      </List>
      {formik.errors.listItems || !countries.length ? <div>Debe seleccionar al menos un país</div> : null}
      <button type="submit" onClick={(event) => event.preventDefault()} className="btn btn-primary">Crear</button>
    </form>
  </div>
}


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
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

  return (
    <div className={"container layout-dashboard " + classes.root}>
      <Prompt
        when={params.listName !== "" || countries.length !== 0}
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
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button style={{visibility: activeStep === steps.length - 1 ? 'hidden' : 'visible'}}
                variant="contained" color="primary" onClick={handleNext}>
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewListComponent;
