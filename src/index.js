import React from 'react';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import CreateReactClass from 'create-react-class';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import rootReducer from './blocks/state';
import routes from './views/routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

sessionService.initSessionService(store, {
  redirectPath: '/auth',
  driver: 'LOCALSTORAGE',
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});

const history = syncHistoryWithStore(browserHistory, store);

const App = CreateReactClass({
  render() {
    return (
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Router history={history}>{routes}</Router>
          </MuiThemeProvider>
        </Provider> 
    );
  },
});

ReactDOM.render(<App />, document.querySelector('#root'));
