export const setAccessToken = (token, expiresAt) => {
  const expiresDate = JSON.stringify((expiresAt * 1000) + new Date().getTime());
  localStorage.setItem('access_token', token);
  localStorage.setItem('expires_at', expiresDate);
};

export const removeAccessToken = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_at');
};

export const getAccessToken = () => {
  const expiresAt = localStorage.getItem('expires_at');
  const now = JSON.stringify(new Date().getTime());

  if (now > expiresAt) {
    removeAccessToken();
  }

  return localStorage.getItem('access_token');
};
