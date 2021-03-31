import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import { getDiseaseList } from '../../redux/actions/meta-action';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Box, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  autocomplete: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  
}));
const getDiseaseLabel = (option) => {
  return option.split('_').map(x => x[0].toUpperCase() + x.substring(1)).join(' ')
}
export default function SymptomSelect(props) {
  const dispatch = useDispatch();
  const {selectedDiseases, setSelectedDiseases} = props;
  const diseaseList = useSelector(state => state.metaReducer.diseaseList);
  const [diseases , setDiseases] = useState(selectedDiseases);
  const classes = useStyles();
     
  const handleChange = (event, value) => {
      if(value) {
        let deepcopy_diseases = {...diseases};
        deepcopy_diseases[value] = true;
        setDiseases(deepcopy_diseases);
        setSelectedDiseases(deepcopy_diseases);
      }
  };

  const onDiseaseSelectionChanged = (event, value) => {
      let deepcopy_diseases = {...diseases};
      deepcopy_diseases[event.target.name] = value;
      setDiseases(deepcopy_diseases);
      setSelectedDiseases(deepcopy_diseases);
  }
  
  useEffect(() => {
      if(!diseaseList)
        dispatch(getDiseaseList());
  }, [])

  return (
    <Box width={600}>
        <Autocomplete
          variant
          options={diseaseList}
          className={classes.autocomplete}
          getOptionLabel={(option) => getDiseaseLabel(option)}
          id="disease-selector"
          renderInput={(params) => <TextField variant="outlined" {...params} label="Diseases" margin="normal" />}
          onChange={handleChange}
        />
        {diseases && <Box className={classes.autocomplete}>
        <FormLabel component="legend">Selected Diseases: </FormLabel>
        <FormGroup>
          {Object.keys(diseases).map(s =>  <FormControlLabel
            key={s}
            control={<Checkbox checked={diseases[s]} onChange={onDiseaseSelectionChanged} name={s} />}
            label={getDiseaseLabel(s)}
          />)}
        
        </FormGroup>
        </Box>}
    </Box>
  );
}
