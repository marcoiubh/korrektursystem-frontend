import '../css/App.css';
import { getCurrentUser } from './services/authenticationService';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Logout from './logout';
import NavBar from './subcomponents/composite/navbar';
import NewTicket from './ticket/newTicket';
import PrivateRoutes from './privateRoutes';
import React, { useState, useEffect } from 'react';
import Ticket from './ticket/ticket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, [user]);

  const handleDeleteUser = () => {
    setUser({});
  };

  return (
    <div>
      <ToastContainer />
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route path="/*" element={<Login />} />
          {/* PrivateRoutes handle all sites that require the user to be logged in */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<Home />} />
            <Route
              path="/ticket/*"
              element={
                <Ticket user={user} onDeleteUser={handleDeleteUser} />
              }
            />
            <Route path="/new" element={<NewTicket user={user} />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">
            {/* Impressum Datenschutzerklärung Login für IU Mitarbeiter */}
            Copyright © 2022 IU Internationale Hochschule - All rights
            reserved
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
