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
    Box
} from '@material-ui/core';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
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
  const [routerPath , setRouterPath] = useState('');
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
    })
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
      <IconButton onClick={props.handleDrawerClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <ListItem button onClick={() => {
          history.push("/");
      }}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
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
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Diagnosis" />
      </ListItem>
    </List>
    <Divider />
  </Drawer>
  );
}