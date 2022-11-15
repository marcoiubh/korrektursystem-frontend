import { Navigate, Outlet } from 'react-router-dom';
import { getJwt } from './services/authenticationService';
const PrivateRoutes = () => {
  // retrieves token from authenticationService
  const token = getJwt();
  // children elements are rendered if token is present only
  // otherwise the user gets redirected to login page
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
