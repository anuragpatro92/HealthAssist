import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Switch, Route, useHistory} from "react-router-dom";
import Routes from './routes';
import Loader from './components/loader/loader';
import Messages from './components/messages/messages';

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
      <AppBar 
       open={open}
       handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
      open={open}
      handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Routes/>
        </Container>
      </main>
      <Loader/>
      <Messages/>
    </div>
  );
}

export default (props) => <BrowserRouter><App {...props}/></BrowserRouter>