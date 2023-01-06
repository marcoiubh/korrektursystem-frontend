import { getCurrentUser } from '../services/authenticationService';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './administration/Login';
import NavBar from './subcomponents/composite/Navbar';
import NewTicket from './ticket/NewTicket';
import React from 'react';
import TicketController from './ticket/TicketController';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Issue from './administration/Issue';
import Footer from './subcomponents/composite/Footer';
import ExpiredSession from './administration/ExpiredSession';
import useRefresh from '../services/useRefresh';

function App() {
  document.body.style.backgroundColor = '#242629';

  const time = useRefresh();

  toast.clearWaitingQueue();

  let user = getCurrentUser();

  return (
    <div className="container">
      <ToastContainer
        transition={Slide}
        limit={1}
        position="top-right"
        autoClose={3000}
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
          <Route
            path="*"
            element={<Navigate to="/ticket/overview" />}
          />
          <Route
            path="/ticket/*"
            element={<TicketController user={user} time={time} />}
          />
          {user.role === 'student' ? (
            <Route path="/new" element={<NewTicket user={user} />} />
          ) : null}
          <Route path="/issue" element={<Issue />} />
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
