import { getCurrentUser } from '../services/authenticationService';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './administration/login';
import Logout from './administration/logout';
import NavBar from './subcomponents/composite/navbar';
import NewTicket from './ticket/newTicket';
import React, { useEffect } from 'react';
import Ticket from './ticket/ticket';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Issue from './administration/issue';
import Footer from './subcomponents/composite/footer';
import ExpiredSession from './administration/expiredSession';
import useRefresh from '../services/useRefresh';

function App() {
  useRefresh();

  let user = getCurrentUser();

  return (
    <div className="app_container">
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavBar user={user} />

      {user ? (
        <Routes>
          <Route index element={<Home />} />
          <Route path="/*" element={<Home />} />
          <Route path="/ticket/*" element={<Ticket user={user} />} />
          <Route path="/new" element={<NewTicket user={user} />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/expiredSession"
            element={<ExpiredSession />}
          />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;
