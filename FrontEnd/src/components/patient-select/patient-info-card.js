import { Avatar, Box, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
        margin: "1rem",
        padding: "1rem",
        width: 500
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
}

}));

export default function PatientInfoCard(props) {
  const classes = useStyles();
  const { patient } = props;
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
            </Box>
         </Box>
         
      </Paper>
  );
}
