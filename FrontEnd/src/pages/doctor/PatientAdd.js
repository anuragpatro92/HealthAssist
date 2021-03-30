import { Typography } from '@material-ui/core';
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
import {useDispatch } from 'react-redux';
import { doctorSignUp } from '../../redux/actions/auth-actions';
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
  password: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
  phone: yup
    .string('Enter your Phone Number')
    .required('Phone Number is required'),
  cert_id: yup
    .string('Enter your License Number')
    .required('License Number is required'),
  address: yup
    .string('Enter your Address')
    .required('Address is required'),      
});


export default function PatientAdd() {
  let history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedSymptoms, setSelectedSymptoms] = useState({});
  
  const formik = useFormik({
    initialValues: {
      name:'',
      email: '',
      phone:'',
      age:'',
      sex:'',
      height:'',
      weight:'',
      chronic_conditions:'',
      address:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      
      dispatch(doctorSignUp(values,history));
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
            />
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
         {/*  <SymptomSelect selectedSymptoms={selectedSymptoms} setSelectedSymptoms={setSelectedSymptoms} /> */}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Patient
        </Button>
      </form>
    </div>
  </Container>
  );
}
