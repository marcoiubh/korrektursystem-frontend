import { deleteToken } from '../../services/authenticationService';

const Logout = () => {
  deleteToken();
};

export default Logout;
