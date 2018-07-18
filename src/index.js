import React from 'react';
import ReactDOM from 'react-dom';
import CreateReactClass from 'create-react-class';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { sessionService } from 'redux-react-session';
import thunk from 'redux-thunk';
import rootReducer from './state/reducers';
import routes from './routes';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

sessionService.initSessionService(store, {
  redirectPath: '/login',
  driver: 'LOCALSTORAGE',
});

export const history = syncHistoryWithStore(browserHistory, store);

export const App = CreateReactClass({
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>{routes}</Router>
      </Provider>
    );
  },
});

ReactDOM.render(<App />, document.querySelector('#root'));
