import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar,IconButton,Typography} from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
  }));
  
export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [routerPath , setRouterPath] = useState('');
  useEffect(() => {
    const unlisten = history.listen((location) => {
        let loc = location.pathname.split('/');
        setRouterPath(loc[1]);
    })
    return () => {
        unlisten();
    }
  }, [])
  var title = "Welcome to Health Assist";
  switch(routerPath) {
    case "": title = "Welcome to Health Assist"; break;
    case "disease-prediction": title = "Disease Predictor"; break;
    case "drug-recommendation": title = "Drug Recommendor"; break;
    case "diagnosis": title = "Your Diagnoses"; break;
    default: title = routerPath; break;
  }
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
  );
}
