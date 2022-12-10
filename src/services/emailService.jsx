import axios from 'axios';
const api = '/issue/';

export const sendEmail = (issue) => {
  return axios.post(api, issue);
};
