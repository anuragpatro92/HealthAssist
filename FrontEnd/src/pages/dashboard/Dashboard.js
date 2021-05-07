import { Grid,Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import DiagnosesCard from './../../components/dashboard/widgets/diagnoses-card';
import PatientsCard from './../../components/dashboard/widgets/patients-card';
import TopSymptomsChart from './../../components/dashboard/charts/top-symptoms-chart';
import TopDiseasesChart from './../../components/dashboard/charts/top-diseases-chart';

const useStyles = makeStyles((theme) => ({
    mb2: {
      marginBottom: 12
    }
}));

export default function Dashboard() {
  let history = useHistory();
  const classes = useStyles();

  useEffect(() => {

  }, [])
  return (
      <>
      <Typography variant="h6" className="s-title" style={{marginBottom: 12, marginTop: 12}}>
        Overview
      </Typography>
      {/* <DiagnosesCard patient={patient} isEditable="true"/> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
            <DiagnosesCard isEditable="true"/>
        </Grid>
        <Grid item xs={4}>
             <PatientsCard isEditable="true"/>    
        </Grid> 
      </Grid>
      <Typography variant="h6" className="s-title" style={{marginBottom: 12, marginTop: 12}}>
       Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
            <TopSymptomsChart />
        </Grid>
        <Grid item xs={6}>
            <TopDiseasesChart />
        </Grid> 
      </Grid>
      
      </>
  );
}
