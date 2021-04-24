import { Avatar, Box, Chip, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Link } from "react-router-dom";
import { getSymptomLabel } from './../../utils/helper';

const useStyles = makeStyles((theme) => ({
  paper: {
        padding: "1rem",
        width: '100%'
  },
  avatar: {
      width: 100,
      height: 100
  },
  infoBox: {
    display: "flex",
    alignItems: "center"
  },
  infoField: {
      flex: 2,
      textAlign: "right"
  },
  infoValue: {
    flex: 3,
    paddingLeft: 24,
    fontSize: 18
},
submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mr2: {
      marginRight: 12,
      marginTop: 12
  }
}));

export default function PatientInfoCard(props) {
  const classes = useStyles();
  const { patient, isEditable } = props;
  return (
    <Paper className={classes.paper}  elevation={3}>
         <Box display="flex">
            <Avatar className={classes.avatar}/>
            <Box flex={1}>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Name:     
                    </Typography>
                    <Typography variant="body1"  className={classes.infoValue}>
                        {patient.name} 
                    </Typography>
                </Box>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Age:
                    </Typography>
                    <Typography variant="body1" className={classes.infoValue}>
                        {patient.age} 
                    </Typography>
                </Box>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Sex:     
                    </Typography>
                    <Typography variant="body1" className={classes.infoValue}>
                        {patient.sex === 'M' ? "Male": "Female"} 
                    </Typography>
                </Box>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Weight:     
                    </Typography>
                    <Typography variant="body1" className={classes.infoValue}>
                        {patient.weight} lbs
                    </Typography>
                </Box>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Height:     
                    </Typography>
                    <Typography variant="body1" className={classes.infoValue}>
                        {patient.height} cms
                    </Typography>
                </Box>
                <Box className={classes.infoBox}>
                    <Typography variant="body2" className={classes.infoField}>
                        Pre-existing Conditions:     
                    </Typography>
                    <Typography variant="body1" className={classes.infoValue}>
                        {patient.chronic_conditions.map(d => <Chip className={classes.mr2} label={getSymptomLabel(d)} variant="outlined" color="secondary" />)}
                    </Typography>
                </Box>
            </Box>
         </Box>
         {isEditable &&
         <Box display="flex" justifyContent="space-between">
         <Link to={{pathname:"/edit_patient",patient:patient}} >
            <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.submit}
            >
                Edit Info
            </Button>
        </Link>
         <Link to={{pathname:"/diagnosis", filters: {
                patient: patient.name,
                sortOrder: 'latest',
                status: 'All'
        }}} >
         <Button
         type="submit"
         fullWidth
         variant="contained"
         color="secondary"
         className={classes.submit}
         >
             View History
         </Button>
        </Link>
        </Box>
       } 
      </Paper>
  );
}
