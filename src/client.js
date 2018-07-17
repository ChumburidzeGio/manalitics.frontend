import axios from 'axios';

export default function client() {
  const token = localStorage.getItem('access_token');
  const header = token ? `Bearer ${token}` : false;

  return axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: header,
    },
  });
}
