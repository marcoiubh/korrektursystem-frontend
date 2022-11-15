import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import Home from './home';
import NavBar from './navbar';
import Tickets from './tickets';
import Login from './login';
import TicketDetails from './ticketDetails';
import Logout from './logout';
import { getCurrentUser } from './services/authenticationService';
import '../css/App.css';
import PrivateRoutes from './privateRoutes';

function App() {
  const [user, setUser] = useState();
  // const [token, setToken] = useState('sfd');

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [user]);

  return (
    <div>
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* redirects gibberish paths to login page if not logged in */}
          {!user && <Route path="/*" element={<Login />} />}

          {/* PrivateRoutes handle all sites that require the user to be logged in */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            {/* redirects gibberish paths to homepage if logged in */}
            <Route path="/*" element={<Home />} />
            <Route path="/tickets">
              <Route index element={<Tickets />} />
              <Route path=":id" element={<TicketDetails />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
