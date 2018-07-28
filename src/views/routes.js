import React from 'react';
import { Route } from 'react-router';
import { sessionService } from 'redux-react-session';
import Dashboard from './dashboard';
import Auth from './auth';
import Settings from './settings';
import Account from './account';

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
    // <Route path="/settings" component={Settings} onEnter={sessionService.checkAuth} />,
    // <Route path="/account/:id" component={Account} onEnter={sessionService.checkAuth} />,
    <Route path="/auth" component={Auth} onEnter={requireGuest} />
];

export default [...authRoutes].reduce((acc, route, i) => {
    acc.push({ ...route, key: i });
    return acc;
}, []);