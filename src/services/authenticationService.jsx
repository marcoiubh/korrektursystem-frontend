import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
    const token = getJwt();
    // get user by email
    const { email: user } = jwtDecode(token);
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

export function verifyJwt() {
  const token = getJwt();
  if (!token) return null;
  const { exp } = jwtDecode(token);
  if (!exp) quitSession();
  if (exp * 1000 < Date.now()) {
    quitSession();
  }
  return token;
}

function quitSession() {
  deleteToken();
  window.location = '/expiredSession';
}

export function getJwt() {
  const token = localStorage.getItem(item);
  return token;
}
