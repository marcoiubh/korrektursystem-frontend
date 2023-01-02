import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {
  getFormattedTimeToLive,
} from './getFormattedTimestamp';
const api = '/authentication/';
const item = 'token';

export const loginUser = async ({ email, password }) => {
  // send credentials in post body -> no caching or logging possible
  // using https is secure
  const response = await axios.post(api, {
    email,
    password,
  });

  // access local storage of the browser
  localStorage.setItem(item, response.data);
  return response;
};

export function deleteToken() {
  localStorage.removeItem(item);
}

export function getCurrentUser() {
  try {
    let user = {};
    const token = getJwt();

    const { email } = jwtDecode(token);
    const { role } = jwtDecode(token);
    const { exp } = jwtDecode(token);

    const ttl = getFormattedTimeToLive(exp * 1000 - Date.now());

    user = {
      email: email,
      role: role,
      timeToLive: ttl,
    };
    return user;
  } catch (error) {}
}

export function getCurrentRole() {
  try {
    const token = getJwt();
    const { role } = jwtDecode(token);
    return role;
  } catch (error) {}
}

export function ifUserIsStudent() {
  return getCurrentRole() === 'student';
}

export function quitSession() {
  deleteToken();
  window.location = '/expiredSession';
}

export function getJwt() {
  const token = localStorage.getItem(item);
  return token;
}
