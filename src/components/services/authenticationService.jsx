import axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from '../../config/config.json';
const api = config.backend.development + 'authentication/';
const item = 'token';
export const loginUser = async ({ email, password }) => {
  const { data: jwt } = await axios.post(api, {
    email,
    password,
  });
  // access local storage of the browser
  localStorage.setItem(item, jwt);
};

export function logout() {
  localStorage.removeItem(item);
}

export function getCurrentUser() {
  try {
    const token = getJwt();
    const { name: user } = jwtDecode(token);
    return user;
  } catch (error) {}
}

export function getJwt() {
  return localStorage.getItem(item);
}
