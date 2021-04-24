import { Select, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect , useState} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useSelector, useDispatch } from 'react-redux';
import { addPatientInfo,editPatientInfo } from '../../redux/actions/patient-action';
import SymptomSelect from './../../components/symptom-select';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter your Name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string('Enter your Phone Number')
    .required('Phone Number is required'),
  age: yup
    .string('Enter your Age')
    .max(2,"Age cannot be greater than 2 digits")
    .required('Age is required'),
  sex: yup
    .string('Enter your Gender')
    .max(1,"Allowed Gender : M or F")
    .required('Gender is required'),
  height: yup
    .string('Enter your Height')
    .max(3,"Height cannot be greater than 3 digits")
    .required('Height is required'),
  weight: yup
    .string('Enter your Weight')
    .max(3,"Weight cannot be greater than 3 digits")
    .required('Weight is required')
});


export default function PatientEdit(props) {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const doctorId = useSelector(state => state.authReducer.user._id);
  const patient = props.history.location.patient;

  let diseases = {};
    patient.chronic_conditions.forEach((item)=>
    diseases[item] = true
    )
  

  const [selectedDiseases, setSelectedDiseases] = useState(diseases);

  const formik = useFormik({
    initialValues: {
      name:patient.name,
      email: patient.email,
      phone:patient.phone,
      age:patient.age,
      sex:patient.sex,
      height:patient.height,
      weight:patient.weight,
      chronic_conditions:patient.chronic_conditions
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const asArray = Object.entries(selectedDiseases);
      const filterValues = asArray.filter(([key, value]) => value !=false);
      const filteredDiseases = Object.fromEntries(filterValues);
      values.chronic_conditions = Object.keys(filteredDiseases);
      values.id = patient._id; 
      dispatch(editPatientInfo(doctorId,values,history));
    },
  });

  useEffect(() => {

  }, [])
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              disabled
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="age"
              label="Age"
              type="age"
              id="age"
              autoComplete="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="sex"
              label="Gender"
              type="text"
              id="sex"
              value={formik.values.sex}
              onChange={formik.handleChange}
              error={formik.touched.sex && Boolean(formik.errors.sex)}
              helperText={formik.touched.sex && formik.errors.sex}
            >
            </TextField>    
            
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="height"
              label="Height"
              type="text"
              id="height"
              value={formik.values.height}
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="weight"
              label="Weight"
              type="text"
              id="weight"
              value={formik.values.weight}
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
          </Grid>
         <SymptomSelect selectedSymptoms={selectedDiseases} setSelectedSymptoms={setSelectedDiseases} label={"Pre-existing conditions"}/>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Update Patient
        </Button>
      </form>
    </div>
  </Container>
  );
}
