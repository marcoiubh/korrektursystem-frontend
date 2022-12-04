import axios from 'axios';
import { getJwt } from './authenticationService';
import { toast } from 'react-toastify';
const api = '/tickets/';

// REACT_APP_ environment variable has been set in .env files
// value is required as config var in heroku! (no quotes)
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = getJwt();
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  toast.error(`an error occured: ${error.response.status}`);

  if (!expectedError) {
    console.log('Error: ', error);
    toast.error('an unexpected error ocurred.');
  }
});

export const getTickets = () => {
  return axios.get(api);
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
