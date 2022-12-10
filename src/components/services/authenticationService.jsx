import axios from 'axios';
import jwtDecode from 'jwt-decode';
const api = '/authentication/';
const item = 'token';

export const loginUser = async ({ email, password }) => {
  // send credentials in post body -> no caching or logging possible
  // using https is secure
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

export function getJwt() {
  return localStorage.getItem(item);
}
