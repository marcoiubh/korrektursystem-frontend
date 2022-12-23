import axios from 'axios';
import { getJwt } from './authenticationService';

const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const sendCurrentTokenToServer = () => {
  axios.defaults.headers.common['x-auth-token'] = getJwt();
};

export const getTickets = async () => {
  sendCurrentTokenToServer();
  return await axios.get(api);
};

export const updateTicket = async (ticket) => {
  sendCurrentTokenToServer();
  return await axios.put(api + ticket._id, ticket);
};

export const saveTicket = async (ticket) => {
  sendCurrentTokenToServer();
  return await axios.post(api, ticket);
};
