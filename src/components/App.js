import '../css/App.css';
import { getCurrentUser } from '../services/authenticationService';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './administration/login';
import Logout from './administration/logout';
import NavBar from './subcomponents/composite/navbar';
import NewTicket from './ticket/newTicket';
import PrivateRoutes from './administration/privateRoutes';
import React, { useEffect } from 'react';
import Ticket from './ticket/ticket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './administration/Contact.jsx';
import Footer from './subcomponents/composite/footer';
import ExpiredSession from './administration/expiredSession';
import useRefresh from '../services/useRefresh';
const debug = require('debug')('http');

function App() {
  debug('test');
  const [time] = useRefresh();

  let user = getCurrentUser();

  useEffect(() => {}, [time]);

  return (
    <div>
      <ToastContainer />
      <NavBar user={user} />
      <div className="container">
        <Routes>
          <Route
            path="/expiredSession"
            element={<ExpiredSession />}
          />
          {!user ? (
            <Route path="/*" element={<Login />} />
          ) : (
            <Route path="/*" element={<Home />} />
          )}

          {/* PrivateRoutes handle all sites that require the user to be logged in */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route
              path="/ticket/*"
              element={<Ticket user={user} />}
            />
            <Route path="/new" element={<NewTicket user={user} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
