import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getFormattedTime } from './getFormattedTimestamp';
const api = '/authentication/';
const item = 'token';

export const loginUser = async ({ email, password }) => {
  // login user with credentials in post body
  const response = await axios.post(api, {
    email,
    password,
  });

  // store token from response data in local storage
  localStorage.setItem(item, response.data);
  return response;
};

export function deleteToken() {
  // delete token from local storage
  localStorage.removeItem(item);
}

export function getCurrentUser() {
  try {
    let user = {};
    // get token from local storage
    const token = getJwt();

    // decode data from token
    const { email, role, exp } = jwtDecode(token);

    // convert expiration time from ms to sec
    const expInSeconds = exp * 1000;

    const now = Date.now();

    // initiate time to automatic logout
    let timeToLogout = '00:00';

    // display remaining time
    // if expiration time not reached
    if (expInSeconds > now)
      timeToLogout = getFormattedTime(expInSeconds - now);

    // create user object to use in application
    user = {
      email: email,
      role: role,
      timeToLogout: timeToLogout,
    };
    return user;
  } catch (error) {}
}

export function quitSession() {
  // log user out and head to expired session view
  deleteToken();
  window.location = '/expiredSession';
}

export function getJwt() {
  // get token from local storage
  const token = localStorage.getItem(item);
  return token;
}
