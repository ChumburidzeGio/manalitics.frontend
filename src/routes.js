import React from 'react';
import { Route } from 'react-router';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
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
    <Route path="/" component={DashboardPage} onEnter={sessionService.checkAuth} />,
    <Route path="/login" component={LoginPage} onEnter={requireGuest} />
];

export default [...authRoutes].reduce((acc, route, i) => {
    acc.push({ ...route, key: i });
    return acc;
}, []);