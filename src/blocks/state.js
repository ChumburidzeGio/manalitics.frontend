import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { sessionReducer } from 'redux-react-session';
import { snackbarReducer } from './app/state';
import transactionReducer from './transactions/state';

const rootReducer = combineReducers({
  snackbarReducer,
  transactionReducer,
  routing: routerReducer,
  session: sessionReducer
});

export default rootReducer;