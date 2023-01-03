import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getFormattedTime } from './getFormattedTimestamp';
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

    const { email, role, exp } = jwtDecode(token);
    const expInSeconds = exp * 1000;
    const now = Date.now();
    let timeToLogout = '00:00';
    if (expInSeconds > now)
      timeToLogout = getFormattedTime(expInSeconds - now);
    user = {
      email: email,
      role: role,
      timeToLogout: timeToLogout,
    };
    return user;
  } catch (error) {}
}

export function quitSession() {
  deleteToken();
  window.location = '/expiredSession';
}

export function getJwt() {
  const token = localStorage.getItem(item);
  return token;
}
