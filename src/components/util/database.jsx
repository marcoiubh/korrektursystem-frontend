import axios from 'axios';

// const api = 'http://localhost:4000/tickets';
const api = 'https://jsonplaceholder.typicode.com/posts';

export const getTickets = () => {
  return axios.get(api);
};
