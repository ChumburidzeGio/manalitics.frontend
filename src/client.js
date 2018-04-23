import axios from 'axios';

export default function client() {
  const token = localStorage.getItem('access_token');
  const header = token ? `Bearer ${token}` : false;

  return axios.create({
    baseURL: 'http://localhost:90/api/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: header,
    },
  });
}
