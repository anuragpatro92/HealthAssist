import { Typography } from '@material-ui/core';
import { fade,withStyles,makeStyles } from '@material-ui/core/styles';
import React, { useEffect , useState} from 'react';
import { useHistory } from "react-router-dom";
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import * as yup from 'yup';
import {useSelector,useDispatch } from 'react-redux';
import { getPatientList } from '../../redux/actions/patient-action';
import PatientInfoCard from './../../components/patient-select/patient-info-card';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(-8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  table: {
    minWidth: 700,
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '105ch',
    },
  }
  
}));

export default function Patients() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const doctorId = useSelector(state => state.authReducer.user._id);
  const patientList = useSelector(state => state.patientReducer.patientList);
  const [filteredResult, setFilteredResult] = useState(patientList);
  const [searchName, setSearchName] = useState('');
  
  const filter = (key) => {
      let result = patientList.filter(p => {
        let doc = "";  
        Object.keys(p).forEach(k => doc += JSON.stringify(p[k] + " ").toLowerCase());
        return doc.includes(key.toLowerCase());
      })
      setFilteredResult(result);
    }

  const handleChange = (event) => {
      setSearchName(event.target.value);
      filter(event.target.value);
  }


  /*const [formValues, setFormValues] = useState({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      cert_id: "",
      address: ""
  })
  const handleChange = (event) => {
      let deepcopy = {...formValues};
      deepcopy[event.target.name] = event.target.value;
      setFormValues(deepcopy);
  }*/
  useEffect(() => {
  
    if(!patientList){
      dispatch(getPatientList(doctorId));
    }
    
  }, [])

  useEffect(() => {
    if(patientList){
      setFilteredResult(patientList);
    }
    
  }, [patientList])

  /*filter = (searchKey) => {
    setFilteredList(list.filter(o => {
        let str = "";
        Object.keys(o).forEach(k => str += o[k] + " ");
        return str.includes(searchKey);
    }))
  }*/
    return (
    <>
    <Box display="flex" flexWrap="wrap">
    <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchName}
              onChange={handleChange}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
          </div>
    </Box>
    <Box display="flex" flexWrap="wrap" margin={2}>
          {filteredResult && 
          filteredResult.map((patient)=> <Box width={500} margin={1}> 
            <PatientInfoCard patient={patient} isEditable="true"/>
            </Box>)
          }
      </Box>
    </>  
    );
  }