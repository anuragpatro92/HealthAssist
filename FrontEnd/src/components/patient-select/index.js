import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getPatientList } from './../../redux/actions/patient-action';
import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import PatientInfoCard from './patient-info-card';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
        margin: "1rem",
        padding: "1rem"
  }
}));

export default function PatientSelect(props) {
  const dispatch = useDispatch();
  const patientList = useSelector(state => state.patientReducer.patientList);
  const classes = useStyles();
  const {selectedPatient , setSelectedPatient} = props;
  const [patient, setPatient] = useState(selectedPatient);

  const handleChange = (event) => {
    let p = patientList.find(p => p._id === event.target.value)
    setPatient(p);
    setSelectedPatient(p);
  };
  
  useEffect(() => {
      if(!patientList)
        dispatch(getPatientList());
  }, [])

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Patient</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={(patient && patient._id) || null}
          onChange={handleChange}
          label="Patient"
        >
            {patientList && patientList.map(p => 
                <MenuItem value={p._id} key={p._id}>{p.name}</MenuItem>
            )}
        </Select>
      </FormControl>
      {patient && <PatientInfoCard patient={patient}/>}
    </div>
  );
}
