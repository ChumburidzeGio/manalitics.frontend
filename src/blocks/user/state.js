import { sessionService } from 'redux-react-session';
import { browserHistory } from 'react-router';
import * as authApi from './api';
import { showSnack } from '../app/state';

export const actionTypes = {
  UPDATE_USER_SUCCESS: 'RRS_UPDATE_USER_SUCCESS',
};

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

export const update = (data) => {
  return () => {
    return authApi.update(data)
      .then(() => {
        sessionService.loadUser().then((user) => {
          sessionService.saveUser(Object.assign({}, user, data));
        });
      });
  };
};

export const login = (user, messages) => {
  return (dispatch) => {
    return authApi.login(user)
      .then(({ token, user }) => authCallback(token, user))
      .catch(() => dispatch(showSnack(messages.error)));
  };
};

export const signup = (user, messages) => {
  return (dispatch) => {
    return authApi.signup(user)
      .then(({ token, user }) => authCallback(token, user))
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