import { combineReducers } from 'redux'
import snackbarReducer from './snackbarReducer'
import transactionReducer from './transactions'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    snackbarReducer,
    transactionReducer,
    routing: routerReducer,
})

export default rootReducer