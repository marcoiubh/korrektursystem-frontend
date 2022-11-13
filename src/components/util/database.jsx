import axios from 'axios';

const api = 'http://localhost:4000/tickets';
// const api = 'https://jsonplaceholder.typicode.com/posts';

export const getTickets = () => {
  return axios.get(api);
};

export const getTicket = (id) => {
  return axios.get(api + '/' + id);
};

export const saveTicket = (id) => {
  axios.post(api + '/' + id);
};

export const updateTicket = (ticket) => {
  axios.put(api + '/' + ticket._id, ticket);
};
