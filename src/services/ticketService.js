import axios from 'axios';

import { getJwt } from './authenticationService';

// api endpoint
const api = '/tickets/';

// environment variable has been set in .env files
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// add token from local storage named as x-auth-token to the header
const sendCurrentTokenToServer = () => {
  axios.defaults.headers.common['x-auth-token'] = getJwt();
};

// GET
export const getTickets = async () => {
  sendCurrentTokenToServer();
  return await axios.get(api);
};

// PUT
export const updateTicket = async (ticket) => {
  sendCurrentTokenToServer();
  return await axios.put(api + ticket._id, ticket);
};

// POST
export const saveTicket = async (ticket) => {
  sendCurrentTokenToServer();
  return await axios.post(api, ticket);
};
