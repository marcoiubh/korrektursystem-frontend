import axios from 'axios';
import { getJwt } from './authenticationService';

const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = getJwt();

export const getTickets = async () => {
  return await axios.get(api);
};

export const getTicket = async (id) => {
  return await axios.get(api + id);
};

export const updateTicket = async (ticket) => {
  return await axios.put(api + ticket._id, ticket);
};

export const saveTicket = async (ticket) => {
  return await axios.post(api, ticket);
};
