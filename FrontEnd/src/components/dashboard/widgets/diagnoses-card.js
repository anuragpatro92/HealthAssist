import { Avatar, Box, Chip, Paper, Typography, Divider ,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import React from 'react';
import { Link } from "react-router-dom";

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
    alignItems: "left"
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

export default function DiagnosesCard(props) {
  const classes = useStyles();
  const { diagnosesCompleted,diagnosesInProgress} = props;
  return (
    <Paper className={classes.paper}  elevation={3}>
       <Grid container spacing={1}>
        <Grid item xs={12}>
            <Typography variant="h5" className="s-title" >
                Diagnoses
            </Typography>
        </Grid>
        <Grid item xs={5}>
            <Typography variant="h1" className="s-title" align="center">
                 {diagnosesCompleted}
            </Typography>
            <Typography variant="h6" align="center">
                 Total
            </Typography>
        </Grid>
        <Grid item xs={2}>
               <Divider orientation="vertical" style={{ background: 'black' }} variant="middle"/>
        </Grid>
        <Grid item xs={5}>
            <Typography variant="h1" className="s-title" align="center">
                 {diagnosesInProgress}
            </Typography>
            <Typography variant="h6" align="center">
                 In Progress
            </Typography>
        </Grid>
        </Grid>         
      </Paper>
  );
}
