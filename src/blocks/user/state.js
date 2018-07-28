import { sessionService } from 'redux-react-session';
import { browserHistory } from 'react-router';
import * as authApi from './api';
import { showSnack } from '../app/state';

const authCallback = (token, data) => {
  sessionService.saveSession({ token })
    .then(() => {
      sessionService.saveUser(data)
        .then(() => {
          browserHistory.push('/');
        })
        .catch(err => console.error(err));
    })
    .catch(() => { });
}

export const login = (user, messages) => {
  return (dispatch) => {
    return authApi.login(user)
      .then(({ token, data }) => authCallback(token, data))
      .catch(() => dispatch(showSnack(messages.error)));
  };
};

export const signup = (user, messages) => {
  return (dispatch) => {
    return authApi.signup(user)
      .then(({ token, data }) => authCallback(token, data))
      .catch(() => dispatch(showSnack(messages.error)));
  };
};

export const logout = () => {
  return () => {
    return authApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      browserHistory.push('/auth');
    }).catch(err => {
      throw (err);
    });
  };
};