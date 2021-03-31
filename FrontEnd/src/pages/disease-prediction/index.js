import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PatientSelect from './../../components/patient-select';
import SymptomSelect from './../../components/symptom-select';
import DiseasePredictions from './../../components/disease-predictions';

import { getDiseasePredictions } from './../../services/ds-service';
import { useDispatch, useSelector } from 'react-redux';
import { createDiagnosis , getDiagnosisList,  updateDiagnosis} from './../../redux/actions/diagnosis-action';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Select Patient', 'Select Symptoms', 'View Results', 'Complete'];
}



export default function VerticalLinearStepper() {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  const [suggestedDiseases, setSuggestedDiseases] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  const user =  useSelector(state => state.authReducer.user);
  const diagnosisList =  useSelector(state => state.diagnosisReducer.diagnosisList);
  const mostRecentDiagnosis =  useSelector(state => state.diagnosisReducer.mostRecent);
  const steps = getSteps();
  useEffect(() => {
    if(params.diagnosisID) {
       if(diagnosisList) {
          const diagnosis = diagnosisList.find(d => d._id === params.diagnosisID);
          setDiagnosis(diagnosis);
          setSelectedPatient(diagnosis.patient_id);
          let symptomObj = {};
          diagnosis.symptoms.forEach(s => symptomObj[s]=true);
          setSelectedSymptoms(symptomObj);
          setSuggestedDiseases(diagnosis.diseases);
          setActiveStep(2);
       } else {
          dispatch(getDiagnosisList(user._id));
       }
    }
  }, [])
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const resetState = () => {
      setActiveStep(0);
      setSelectedPatient(null);
      setSelectedSymptoms({});
      setSuggestedDiseases([]);
  }
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PatientSelect selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />;
      case 1:
        return <SymptomSelect selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} />;
      case 2:
        return <DiseasePredictions suggestedDiseases={suggestedDiseases} setSuggestedDiseases={setSuggestedDiseases} />;
      case 3:
        return <Box>
            <Typography variant="body1">
              <p>
              Your diagnosis is complete !!
              </p>
              <p>
              Next Steps: 
              </p>
            </Typography>
          
          <Box display="flex" flexDirection="column" width={300} height={200} justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push('/diagnosis')
              }}
            >
              View Diagnosis List
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={resetState}
            >
              Start new diagnosis
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                history.push(`/drug-recommendation/${diagnosis ? diagnosis._id : mostRecentDiagnosis}`)
              }}
            >
              Get Drug Recommendations
            </Button>
          </Box>
        </Box>;
      default:
        return 'Unknown step';
    }
  }
  const getStepActions = (step) => {
    switch (step) {
      case 0:
        return <div>
          <Button
            disabled
            className={classes.button}

          >
            Back
                </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={!selectedPatient}
            className={classes.button}
          >
            Next
                </Button>
        </div>;
      case 1:
        return <div>
          <Button
            className={classes.button}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={async () => {
              let symptomList = Object.keys(selectedSymptoms).filter(s => selectedSymptoms[s]);
              const resp = await getDiseasePredictions(  symptomList , dispatch);
              setSuggestedDiseases(resp);
              handleNext();
            }}
            disabled={Object.keys(selectedSymptoms).length === 0}
            className={classes.button}
          >
            Get Predictions
        </Button>
        </div>;
      case 2:
        return <div>
          <Button
            className={classes.button}
            onClick={handleBack}
          >
            Back
        </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              if(diagnosis) {
                const updateDiagnosisData = {
                  patient_id: selectedPatient._id, 
                  doctor_id: user._id,
                  status: "Diagnosis Completed",
                  symptoms: Object.keys(selectedSymptoms).filter(s => selectedSymptoms[s]),
                  diseases: suggestedDiseases,
                  drugs: diagnosis.drugs
                }
                dispatch(updateDiagnosis(diagnosis._id, updateDiagnosisData));
              }else {
                const newDiagnosis = {
                  patient_id: selectedPatient._id, 
                  doctor_id: user._id,
                  status: "In Progress",
                  symptoms: Object.keys(selectedSymptoms).filter(s => selectedSymptoms[s]),
                  diseases: suggestedDiseases,
                  drugs: []
                }
                dispatch(createDiagnosis(newDiagnosis));
              }
             
              handleNext();
            }}
          >
            Finish
      </Button>
        </div>;
      default:
        return null;
    }
  }
  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                {getStepActions(index)}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
