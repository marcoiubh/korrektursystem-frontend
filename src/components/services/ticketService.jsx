import axios from 'axios';
import {
  getJwt,
  getCurrentRole,
  getCurrentUser,
} from './authenticationService';
const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = getJwt();

export const getTickets = () => {
  const role = getCurrentRole();
  const email = getCurrentUser();
  return axios.get(api + '?' + role + '=' + email);
};

export const getTicket = (id) => {
  return axios.get(api + id);
};

export const updateTicket = (ticket) => {
  axios.put(api + ticket._id, ticket);
};

export const saveTicket = (ticket) => {
  axios.post(api, ticket);
};
