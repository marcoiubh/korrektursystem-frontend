import axios from 'axios';
const api = '/issue/';

export const sendEmail = async (issue) => {
  return await axios.post(api, issue);
};
