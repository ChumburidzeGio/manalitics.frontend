import React from 'react'
import ReactDOM from 'react-dom'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import CreateReactClass from 'create-react-class'
import rootReducer from './state/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { getAccessToken } from './auth'

// Add the reducers to store
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const rootEl = document.querySelector('#root')

const App = CreateReactClass({

    render: function() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={DashboardPage} onEnter={requireAuth}/>
                    <Route path="/login" component={LoginPage} onEnter={requireGuest}/>
                </Router>
            </Provider>
        )
    }

});

function requireGuest(nextState, replace) {
    if (getAccessToken()) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function requireAuth(nextState, replace) {
    if (!getAccessToken()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

ReactDOM.render(<App />, rootEl);