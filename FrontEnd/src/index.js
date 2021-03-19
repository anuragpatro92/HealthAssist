import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { ThemeProvider , createMuiTheme } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import orange  from '@material-ui/core/colors/orange';
import store from "./redux/store";
import { Provider } from 'react-redux';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: orange
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
