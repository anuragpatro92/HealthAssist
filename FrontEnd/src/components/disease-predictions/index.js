import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getSymptomList } from '../../redux/actions/meta-action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Box, Paper, FormGroup, FormControlLabel, CircularProgress, Typography, Button } from '@material-ui/core';
import { green, red, orange } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    margin: theme.spacing(1)
  },
  dname: {
    flex: 1
  },
  dactions: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  strong : {
    color: green[600]
  },
  moderate : {
    color: orange[800]
  },
  weak : {
    color: red[600]
  },
  statusLabel: {
    display: "flex",
    alignItems: "center"
  }
}));
const getClassNameFromConfidence = (confidence) => {
    if(confidence > 75) {
      return 'strong';
    } else if(confidence < 40) {
      return 'weak';
    }else {
      return 'moderate';
    }
} 
export default function DiseasePredictions(props) {
  const { suggestedDiseases, setSuggestedDiseases } = props;
  const classes = useStyles();
  const handleStatusChange = (disease, status) => () =>  {
      let deepcopy = [...suggestedDiseases];
      deepcopy.forEach(d => {
         if(d.disease_id === disease.disease_id) {
             d.status = status;
         }
      })
      setSuggestedDiseases(deepcopy);
  }
  useEffect(() => {
  }, [])
  
  return (
    <Box width={800}>
      <Typography variant="body1">
        <p>
         Our Machine Learning algorithm suggests the following diseases based on the symptoms you selected. 
         Please confirm or reject the suggestions to improve accuracy of results and help our system get smarter
         </p>
      </Typography>
      {suggestedDiseases.map(disease => <Paper variant="outlined" className={classes.paper}>
        <Typography variant={"h6"} className={classes.dname}>
          {disease.disease_name}
        </Typography>
        <Box position="relative" display="inline-flex" >
          <CircularProgress variant="determinate" value={disease.confidence} className={classes[getClassNameFromConfidence(disease.confidence)]}/>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
              disease.confidence,
            )}%`}</Typography>
          </Box>
        </Box>
        <Box className={classes.dactions}>
            {disease.status === "Suggested" && <>
              <Button variant="outlined" color="secondary" onClick={handleStatusChange(disease, "Rejected")}>Reject</Button> &nbsp;
              <Button variant="contained" color="secondary" onClick={handleStatusChange(disease, "Accepted")}>Accept</Button></>
            }
            {disease.status === "Rejected" && <Typography variant="h6" className={classes.statusLabel}>
            <CancelIcon className={classes.weak} fontSize={"20px"}/> &nbsp; Rejected
            </Typography>}
            {disease.status === "Accepted" && <Typography variant="h6"  className={classes.statusLabel}>
            <CheckCircleIcon className={classes.strong}/> &nbsp; Accepted
            </Typography>}
        </Box>

      </Paper>)}
      <Typography variant="body2">
        <p>
          Click on Finish to complete this diagnosis and save it for future reference.
        </p>
      </Typography>
    </Box>
  );
}
