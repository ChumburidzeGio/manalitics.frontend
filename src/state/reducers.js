import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import snackbarReducer from './snackbarReducer';
import transactionReducer from './transactions';

const rootReducer = combineReducers({
  snackbarReducer,
  transactionReducer,
  routing: routerReducer,
});

export default rootReducer;
