import axios from 'axios';
import { api_url } from './helpers';

export default function client() {
  const token = localStorage.getItem('access_token');
  const header = token ? `Bearer ${token}` : false;

  return axios.create({
    baseURL: api_url(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: header,
    },
  });
}
