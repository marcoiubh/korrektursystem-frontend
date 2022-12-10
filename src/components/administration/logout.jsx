import { useEffect } from 'react';
import { deleteToken } from '../../services/authenticationService';

const Logout = () => {
  useEffect(() => {
    deleteToken();
    window.location = '/';
  }, []);
  return null;
};

export default Logout;
