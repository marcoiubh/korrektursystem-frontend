import '../css/App.css';
import { getCurrentUser } from './services/authenticationService';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Logout from './logout';
import NavBar from './subcomponents/navbar';
import NewTicket from './newTicket';
import PrivateRoutes from './privateRoutes';
import React, { useState, useEffect } from 'react';
import TicketDetailsProfessor from './ticketDetailsProfessor';
import TicketDetailsStudent from './ticketDetailsStudent';
import Tickets from './tickets';

function App() {
  const [user, setUser] = useState();

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
              <Route
                path=":id"
                element={<TicketDetailsProfessor />}
              />
            </Route>
            <Route path="/new" element={<NewTicket />} />
            <Route
              path="/status/:id"
              element={<TicketDetailsStudent />}
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
