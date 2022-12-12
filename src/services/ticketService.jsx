import axios from 'axios';
import { verifyJwt } from './authenticationService';
import { toast } from 'react-toastify';
const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = verifyJwt();

// TODO: 500 errors
axios.interceptors.response.use(null, (error) => {
  const { data } = error.response;
  if (error.response) {
    toast.error(data);
  }
});

export const getTickets = () => {
  return axios.get(api);
};

export const getTicket = (id) => {
  return axios.get(api + id);
};

export const updateTicket = (ticket) => {
  return axios.put(api + ticket._id, ticket);
};

export const saveTicket = (ticket) => {
  return axios.post(api, ticket);
};
