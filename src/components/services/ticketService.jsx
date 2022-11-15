import axios from 'axios';
import { getJwt } from './authenticationService';
const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = getJwt();

export const getTickets = () => {
  return axios.get(api);
};

export const getTicket = (id) => {
  return axios.get(api + id);
};

export const updateTicket = (ticket) => {
  axios.put(api + ticket._id, ticket);
};
