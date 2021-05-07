import { Grid,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import DiagnosesCard from './../../components/dashboard/widgets/diagnoses-card';
import PatientsCard from './../../components/dashboard/widgets/patients-card';
import TopSymptomsChart from './../../components/dashboard/charts/top-symptoms-chart';
import TopDiseasesChart from './../../components/dashboard/charts/top-diseases-chart';
import { getDiagnosisList } from '../../redux/actions/diagnosis-action';
import { useDispatch, useSelector } from 'react-redux';
import {getDashboardData} from '../../utils/helper';

const useStyles = makeStyles((theme) => ({
    mb2: {
      marginBottom: 12
    }
}));

export default function Dashboard() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const diagList  = useSelector(state => state.diagnosisReducer.diagnosisList);
  const user  = useSelector(state => state.authReducer.user);

  let diagnosesCompleted,diagnosesInProgress,patientsTotal;
  let symptoms = [];
  let diseases = [];
  let desiredData = {diagnosesCompleted,diagnosesInProgress,patientsTotal,symptoms,diseases};

  desiredData = getDashboardData(diagList);


  useEffect(() => {
    if(!diagList)
      dispatch(getDiagnosisList(user._id))
  }, [])
  return (
      <>
      <Typography variant="h6" className="s-title" style={{marginBottom: 12, marginTop: 12}}>
        Overview
      </Typography>
      {/* <DiagnosesCard patient={patient} isEditable="true"/> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <DiagnosesCard diagnosesCompleted={desiredData.diagnosesCompleted} diagnosesInProgress={desiredData.diagnosesInProgress}/>
        </Grid>
        <Grid item xs={4}>
             <PatientsCard patientsTotal={desiredData.patientsTotal}/>    
        </Grid> 
      </Grid>
      <Typography variant="h6" className="s-title" style={{marginBottom: 12, marginTop: 12}}>
       Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <TopSymptomsChart symptoms={desiredData.symptoms}/>
        </Grid>
        <Grid item xs={6}>
            <TopDiseasesChart diseases={desiredData.diseases}/>
        </Grid> 
      </Grid>
      
      </>
  );
}
