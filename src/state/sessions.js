import { sessionService } from 'redux-react-session';
import * as authApi from '../api/authApi';
import { showSnack } from './snackbarActions';

export const login = (user, history, messages) => {
  return (dispatch) => {
    return authApi.login(user)
      .then(({ token, data }) => {
        sessionService.saveSession({ token })
          .then(() => {
            sessionService.saveUser(data)
              .then(() => {
                history.push('/');
              })
              .catch(err => console.error(err));
          })
          .catch(() => { });
      })
      .catch(() => dispatch(showSnack(messages.error)));
  };
};

export const logout = (history) => {
  return () => {
    return authApi.logout().then(() => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/login');
    }).catch(err => {
      throw (err);
    });
  };
};