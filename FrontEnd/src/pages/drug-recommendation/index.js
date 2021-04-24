import React, { useState , useEffect} from 'react';
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
import DrugSelect from './../../components/drug-select';

import { getDiseasePredictions, getDrugRecommendations } from './../../services/ds-service';
import { useDispatch, useSelector } from 'react-redux';
import { createDiagnosis , getDiagnosisList, updateDiagnosis} from './../../redux/actions/diagnosis-action';
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
  return ['Select Patient', 'Select Symptoms', 'Confirm Disease', 'Prescribe Drugs', 'Complete'];
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
  const [prescribedDrugs, setPrescribedDrugs] = useState([]);
  const [suggestedDrugs, setSuggestedDrugs] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);
  
  const steps = getSteps();
  const user =  useSelector(state => state.authReducer.user);
  const diagnosisList =  useSelector(state => state.diagnosisReducer.diagnosisList);

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
      setPrescribedDrugs([]);
      setSuggestedDrugs([]);
  }
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
          if(diagnosis.status === 'Completed')
            setActiveStep(4);
          else 
            setActiveStep(2);
       } else {
          dispatch(getDiagnosisList(user._id));
       }
    }
  }, [])
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PatientSelect selectedPatient={selectedPatient} setSelectedPatient={setSelectedPatient} />;
      case 1:
        return <SymptomSelect selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} />;
      case 2:
        return <DiseasePredictions suggestedDiseases={suggestedDiseases} setSuggestedDiseases={setSuggestedDiseases} />;
      case 3: 
        return <DrugSelect suggestedDrugs={suggestedDrugs} setPrescribedDrugs={setPrescribedDrugs} />;
      case 4:
        return <Box mt={4}>
            <Typography variant="body1">
              <p>
                 Thank you. You're diagnosis is complete. 
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
              Start new prescription
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
            onClick={async () => {
              let symptomList = new Set(Object.keys(selectedSymptoms).filter(s => selectedSymptoms[s]));
              selectedPatient.chronic_conditions.forEach(d => symptomList.add(d))
              let disease = suggestedDiseases.find(d => d.status === "Accepted");
              const drugs = await getDrugRecommendations(Array.from(symptomList) , disease, dispatch);
              setSuggestedDrugs(drugs);
              handleNext();
            }}
            disabled={suggestedDiseases.filter(d => d.status === "Accepted").length <= 0}
          >
            Next
      </Button>
        </div>;
        case 3:
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
                const newDiagnosis = {
                  patient_id: selectedPatient._id, 
                  doctor_id: user._id,
                  status: "Completed",
                  symptoms: Object.keys(selectedSymptoms).filter(s => selectedSymptoms[s]),
                  diseases: suggestedDiseases,
                  drugs: prescribedDrugs
                }
                if(diagnosis) {
                  dispatch(updateDiagnosis(diagnosis._id, newDiagnosis));
                }else {
                  dispatch(createDiagnosis(newDiagnosis));
                }
                handleNext();
              }}
              disabled={prescribedDrugs.length === 0}
            >
              SUBMIT
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
