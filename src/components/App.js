import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import NavBar from './navbar';
import Tickets from './tickets';
import Login from './login';
import TicketDetails from './ticketDetails';
import Logout from './logout';
import { getCurrentUser } from './services/authenticationService';
import '../App.css';

function App() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    console.log(`user: ${user}`);
    setUser(user);
  });

  return (
    <div>
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
