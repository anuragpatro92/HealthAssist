import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getSymptomList } from '../../redux/actions/meta-action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Box, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { getSymptomLabel } from './../../utils/helper';



const useStyles = makeStyles((theme) => ({
  autocomplete: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  
}));

export default function SymptomSelect(props) {
  const dispatch = useDispatch();
  const {selectedSymptoms, setSelectedSymptoms} = props;
  const symptomList = useSelector(state => state.metaReducer.symptomList);
  const [symptoms , setSymptoms] = useState(selectedSymptoms);
  const classes = useStyles();

  const handleChange = (event, value) => {
      if(value) {
        let deepcopy_symptoms = {...symptoms};
        deepcopy_symptoms[value] = true;
        setSymptoms(deepcopy_symptoms);
        setSelectedSymptoms(deepcopy_symptoms);
      }
  };

  const onSymptomSelectionChanged = (event, value) => {
      let deepcopy_symptoms = {...symptoms};
      deepcopy_symptoms[event.target.name] = value;
      setSymptoms(deepcopy_symptoms);
      setSelectedSymptoms(deepcopy_symptoms);
  }
  
  useEffect(() => {
      if(!symptomList)
        dispatch(getSymptomList());
  }, [])

  return (
    <Box width={600}>
        <Autocomplete
          options={symptomList}
          className={classes.autocomplete}
          getOptionLabel={(option) => getSymptomLabel(option)}
          id="symptom-selector"
          renderInput={(params) => <TextField variant="outlined" {...params} label="Symptoms" margin="normal" />}
          onChange={handleChange}
        />
        {symptoms && <Box className={classes.autocomplete}>
        <FormLabel component="legend">Selected Symptoms: </FormLabel>
        <FormGroup>
          {Object.keys(symptoms).map(s =>  <FormControlLabel
            key={s}
            control={<Checkbox checked={symptoms[s]} onChange={onSymptomSelectionChanged} name={s} />}
            label={getSymptomLabel(s)}
          />)}
        
        </FormGroup>
        </Box>}
    </Box>
  );
}
