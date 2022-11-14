import axios from 'axios';
import config from '../../config/config.json';
import { getJwt } from './authenticationService';
const api = config.backend.development + 'tickets/';

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
