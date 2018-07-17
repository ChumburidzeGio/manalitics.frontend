import React from 'react';
import ReactDOM from 'react-dom';
import CreateReactClass from 'create-react-class';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './state/reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import routes from './routes';
import { sessionService } from 'redux-react-session';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

sessionService.initSessionService(store, { 
    redirectPath: '/login', 
    driver: 'LOCALSTORAGE' 
});

export const history = syncHistoryWithStore(browserHistory, store);

export const App = CreateReactClass({
    render() {
      return (
        <Provider store={store}>
          <Router history={history}>{routes}</Router>
        </Provider>
      );
    }
});

ReactDOM.render(<App />, document.querySelector('#root'));
