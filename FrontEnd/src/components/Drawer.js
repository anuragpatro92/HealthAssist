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
  const [projectList, setProjectList] = useState([]);
  const [showProjects , setShowProjects] = useState(false);
  const [projectID, setProjectID] = useState("-1");
  const getProjects = async() => {
    const resp = await axios.get('/api/projects');
    if(resp.status === 200) {
        setProjectList(resp.data)
    }
  }
  useEffect(() => {
    const unlisten = history.listen((location) => {
        let loc = location.pathname.split('/');
        if(loc[1] === 'project') {
            setShowProjects(true);
            setProjectID(loc[2]);
            return;
        } 
        if(loc[1] === '') {
            getProjects();
            setShowProjects(false);
        }
        setProjectID('-1')
    })
    getProjects();
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
          setShowProjects(!showProjects);
      }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {showProjects ? <ExpandMoreIcon/> : <ChevronRightIcon/> }
      </ListItem>
    </List>
    {showProjects && 
    <Box pl={2}>
      {projectList.map(p => <List>
        <ListItem button onClick={() => {
            history.push(`/project/${p.id}`);
        }}
        >
          <ListItemText primary={p.name} className={p.id === projectID && classes.selected}/>
        </ListItem>
      </List>)
      }
    </Box>
    } 
    <Divider />
  </Drawer>
  );
}
