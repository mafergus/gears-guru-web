import React from 'react';
import ReactDOM from 'react-dom';
import 'es5-shim';
import 'es6-shim';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

import 'static/index.scss';
import MainPage from 'components/MainPage';
import store from 'datastore/store';
import firebase from 'datastore/database';
import history from 'datastore/history';
import { primary, secondary } from 'util/colors';

firebase.init();

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary[100],
      main: primary[500],
      dark: primary[900],
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: secondary[100],
      main: secondary[300],
      dark: secondary[700],
      contrastText: '#FFFFFF',
    },
    accent1color: "red",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <MainPage />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();