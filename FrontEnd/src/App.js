import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import PublicRoutes from './routes/public-routes';
import PrivateRoutes from './routes/index';
import Loader from './components/loader/loader';
import Messages from './components/messages/messages';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import store from "../src/redux/store";
import { setCurrentUser } from "../src/redux/actions/auth-actions";




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  if(localStorage.loggedInUserInfo){
    const userInfo = localStorage.loggedInUserInfo;
    store.dispatch(setCurrentUser(JSON.parse(userInfo)));
  }
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      {isAuthenticated &&
      <>
      <AppBar 
       open={open}
       handleDrawerOpen={handleDrawerOpen}
      />
      
      <Drawer
      open={open}
      handleDrawerClose={handleDrawerClose}
      />
      </>
     }
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {isAuthenticated ? <PrivateRoutes/> : <PublicRoutes/>}            
        </Container>
      </main>
      <Loader/>
      <Messages/>
    </div>
  );
}


export default (props) => <BrowserRouter><App {...props}/></BrowserRouter>