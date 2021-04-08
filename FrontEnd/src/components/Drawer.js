import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import EventNoteIcon from '@material-ui/icons/EventNote';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FolderSharedIcon from '@material-ui/icons/FolderShared';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    selected: {
        color: theme.palette.primary.main
    }
  }));
  
export default function SideDrawer(props) {
  const classes = useStyles();
  var history = useHistory();
  const [routerPath , setRouterPath] = useState(history.location.pathname.split('/')[1]);
  const [showServices , setShowServices] = useState(false);
  const services = [
    {
       name: "Disease Prediction",
       path: "disease-prediction"
    }, 
    {
      name: "Drug Recommendation",
      path: "drug-recommendation"
    }
  ]
  useEffect(() => {
    const unlisten = history.listen((location) => {
        let loc = location.pathname.split('/');
        setRouterPath(loc[1]);
        if(services.find(s => s.path === loc[1])) {
          setShowServices(true);
        }
    })
    if(services.find(s => s.path === history.location.pathname.split('/')[1])) {
      setShowServices(true);
    }
    return () => {
        unlisten();
    }
  }, [])
  return (
    <Drawer
        variant="permanent"
        classes={{
        paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
        }}
        open={props.open}
  >
    <div className={classes.toolbarIcon}>
      {/* <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton> */}
      <Typography variant="h5">
          Health Assist
      </Typography>
    </div>
    <Divider />
    <List>
      <ListItem button onClick={() => {
          history.push("/");
      }}>
        <ListItemIcon>
          <HomeIcon color={'' === routerPath ? "primary": "default"}/>
        </ListItemIcon>
        <ListItemText primary="Home" className={'' === routerPath && classes.selected}/>
      </ListItem>
    </List>
    <List>
      <ListItem button onClick={() => {
          setShowServices(!showServices);
      }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Services" />
        {showServices ? <ExpandMoreIcon/> : <ChevronRightIcon/> }
      </ListItem>
    </List>
    {showServices && 
    <Box pl={2}>
      {services.map(s => <List>
        <ListItem button onClick={() => {
            history.push(`/${s.path}`);
        }}
        >
          <ListItemText primary={s.name} className={s.path === routerPath && classes.selected}/>
        </ListItem>
      </List>)
      }
    </Box>
    } 
    <List>
      <ListItem button onClick={() => {
          history.push("/diagnosis");
      }}>
        <ListItemIcon>
          <EventNoteIcon color={'diagnosis' === routerPath ? "primary" : "default"}/>
        </ListItemIcon>
        <ListItemText primary="Diagnosis" className={'diagnosis' === routerPath && classes.selected}/>
      </ListItem>
    </List>
    <Divider />
    <List>
      <h5>&nbsp;&nbsp;&nbsp;Patient</h5>
      <ListItem button onClick={() => {
          history.push("/add_patient");
      }}>
        <ListItemIcon>
          <PersonAddIcon color={'add_patient' === routerPath ? "primary" : "default"}/>
        </ListItemIcon>
        <ListItemText primary="Register Patient" className={'add_patient' === routerPath && classes.selected}/>
      </ListItem>
      <ListItem button onClick={() => {
          history.push("/patients");
      }}>
        <ListItemIcon>
          <FolderSharedIcon color={'patients' === routerPath ? "primary" : "default"}/>
        </ListItemIcon>
        <ListItemText primary="Patient Directory" className={'patients' === routerPath && classes.selected}/>
      </ListItem>
    </List>
  </Drawer>
  );
}