import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import snackbarReducer from './snackbarReducer';
import transactionReducer from './transactions';
import { sessionReducer } from 'redux-react-session';

const rootReducer = combineReducers({
  snackbarReducer,
  transactionReducer,
  routing: routerReducer,
  session: sessionReducer
});

export default rootReducer;
