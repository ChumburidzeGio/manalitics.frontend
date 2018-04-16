import { actionTypes } from './authReducer';
import sessionApi from '../api/SessionApi';

export function loginSuccess() {
    return {type: actionTypes.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {
    return function(dispatch) {
        return sessionApi.login(credentials).then(response => {
            sessionStorage.setItem('jwt', response.jwt);
            dispatch(loginSuccess());
        }).catch(error => {
            throw(error);
        });
    };
}