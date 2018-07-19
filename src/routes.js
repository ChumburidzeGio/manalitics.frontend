import React from 'react';
import { Route } from 'react-router';
import Dashboard from './pages/Dashboard/Dashboard';
import Auth from './pages/Auth/Auth';
import { sessionService } from 'redux-react-session';

const requireGuest = (nextState, replace, next) => {
    return sessionService.loadSession()
    .then(() => {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname },
        });
        next();
    })
    .catch(() => next());
}

const authRoutes = [
    <Route path="/" component={Dashboard} onEnter={sessionService.checkAuth} />,
    <Route path="/auth" component={Auth} onEnter={requireGuest} />
];

export default [...authRoutes].reduce((acc, route, i) => {
    acc.push({ ...route, key: i });
    return acc;
}, []);