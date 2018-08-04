import { isEnv, client, getRandBool } from '../../helpers';
import * as factories from '../../factories';

/**
 * Sign in user with email and password
 *
 * @augments user.email String
 * @augments user.password String
 * 
 * @return Promise
 */
export const login = (user) => {
  if (isEnv('development')) {
    return client().post('auth/login', user).then(response => response.data);
  }

  if (user.email === 'chumburidze.giorgi@outlook.com') {
    const response = factories.generateAuthResponse(user);
    return new Promise(resolve => setTimeout(resolve(response), 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

/**
 * Sign up user with name, email, password
 *
 * @augments user.name String
 * @augments user.email String
 * @augments user.password String
 * 
 * @return Promise
 */
export const signup = (user) => {
  if (isEnv('development')) {
    return client().post('auth/register', user).then(response => response.data);
  }

  if (user.email === 'chumburidze.giorgi@outlook.com') {
    return new Promise(resolve => setTimeout(resolve(fakeAuthSuccessResponse(user)), 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject, 1000));
};

/**
 * Log out user
 * 
 * @return Promise
 */
export const logout = () => {
  if (isEnv('development')) {
    return client().post('auth/logout');
  }

  return new Promise(resolve => setTimeout(resolve, 1000));
};

/**
 * Update user
 * 
 * @augments [user.name] String
 * @augments [user.email] String
 * @augments [user.currency] String
 * @augments [user.current_pass] String
 * @augments [user.new_pass] String
 * 
 * @return Promise
 */
export const update = (user) => {
  if (isEnv('development')) {
    return client().post('auth/update', user);
  }

  if(getRandBool()) {
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject, 1000));
};