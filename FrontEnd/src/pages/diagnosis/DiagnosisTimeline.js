import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {  List,  ListItemText , ListItem, Box } from '@material-ui/core';
import { getSymptomLabel } from './../../utils/helper';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { green, red, orange } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HealingIcon from '@material-ui/icons/Healing';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
    backgroundColor: "darkslategray"
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
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
  diseaseInfoHeader: {
      display: "flex",
      justifyContent: "space-between"
  }
}));

const wasDiseaseAccepted = (diseases) => {
    if(diseases.find(d => d.status === 'Accepted'))
        return true;
    return false;
}

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const { diagnosis } = props;

  const getDiseaseStatusIcon = (status) => {
    if(status === 'Suggested') 
        return <NewReleasesIcon className={classes.moderate}/>
    else if(status === 'Accepted')
        return <CheckCircleIcon  className={classes.strong}/>
    else 
        return <CancelIcon className={classes.weak}/>
   }

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
                {new Date(diagnosis.created_at).toLocaleString()}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <AccessibilityIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Symptoms observed
            </Typography>
            <List>
                {diagnosis.symptoms.map(s => <ListItem>
                  <ListItemText
                    primary={getSymptomLabel(s)}
                  />
                </ListItem>)}
            </List>
          </Paper>
        </TimelineContent>
      </TimelineItem>



      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {(!wasDiseaseAccepted(diagnosis.diseases) || diagnosis.drugs.length === 0) ? new Date(diagnosis.updated_at).toLocaleString() : 'No data'}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <HealingIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Box className={classes.diseaseInfoHeader}>
                <Typography variant="h6" component="h1">
                    Disease Predicted
                </Typography>
                <Typography variant="h6" component="h1">
                    Status
                </Typography>
            </Box>
            <List>
                {diagnosis.diseases.map(s => <ListItem>
                  <ListItemText
                    primary={s.disease_name}
                  />
                  {getDiseaseStatusIcon(s.status)}
                </ListItem>)}
            </List>
            {!wasDiseaseAccepted(diagnosis.diseases) && 
            <Link href="#" color="secondary">
                Complete this step
            </Link>}
          </Paper>
        </TimelineContent>
      </TimelineItem>



      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" variant="outlined">
            <AssignmentIcon />
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
              Drugs Prescribed
            </Typography>
            {(diagnosis.drugs && diagnosis.drugs.length > 0) ? 
            <List>
            {diagnosis.drugs.map(d => <ListItem>
              <ListItemText
                primary={d.drug_name}
              />
                </ListItem>)}
            </List> :
                <Typography variant="body1" component="p">
                    No drugs were prescribed yet!
                </Typography>
            }

            {wasDiseaseAccepted(diagnosis.diseases) ? 
                <Link>
                    Prescribe Drugs
                </Link> :
                <Typography variant="body1">
                    Complete disease prediction to prescribe drugs
                </Typography>
            }
          </Paper>
        </TimelineContent>
      </TimelineItem>

    </Timeline>
  );
}
