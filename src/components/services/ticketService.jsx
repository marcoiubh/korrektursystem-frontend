import axios from 'axios';
import { getJwt } from './authenticationService';
import { toast } from 'react-toastify';
const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = getJwt();
axios.interceptors.response.use(null, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        toast.error(`Invalid email or password.`);
        break;
      case 401:
        toast.error(`Access denied. No token provided.`);
        break;
      case 404:
        toast.error(`Server cannot find the requested resource.`);
        break;

      default:
        toast.error('An unexpected error ocurred.');
    }
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
