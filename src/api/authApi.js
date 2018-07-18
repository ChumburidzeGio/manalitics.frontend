import client from '../client';

export const login = (user) => {
  const response = {
    token: '1a2b3c4d',
    data: {
      email: user.email,
      firstName: 'test',
      lastName: 'test'
    }
  };

  const errorResponse = {
    message: 'error'
  };

  if (process.env.ENV === 'development') {
    return client().post('auth/login', user);
  }

  if (user.email === 'chumburidze.giorgi@outlook.com') {
    return new Promise(resolve => setTimeout(resolve(response), 1000));
  }

  return new Promise((resolve, reject) => setTimeout(reject(errorResponse), 1000));
};

export const logout = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};