import client from '../client';
import { isEnv } from '../helpers';

const fakeAuthSuccessResponse = (user) => ({
  token: '1a2b3c4d',
  data: {
    email: user.email,
    firstName: 'test',
    lastName: 'test'
  }
});

export const login = (user) => {
  if (isEnv('development')) {
    return client().post('auth/login', user);
  }

  if (user.email === 'chumburidze.giorgi@outlook.com') {
    return new Promise(resolve => setTimeout(resolve(fakeAuthSuccessResponse(user)), 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const signup = (user) => {
  if (isEnv('development')) {
    return client().post('auth/signup', user);
  }

  if (user.email === 'chumburidze.giorgi@outlook.com') {
    return new Promise(resolve => setTimeout(resolve(fakeAuthSuccessResponse(user)), 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};