import { getCurrentUser } from '../services/authenticationService';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './administration/login';
import NavBar from './subcomponents/composite/navbar';
import NewTicket from './ticket/newTicket';
import React from 'react';
import Ticket from './ticket/ticket';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Issue from './administration/issue';
import Footer from './subcomponents/composite/footer';
import ExpiredSession from './administration/expiredSession';
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
        autoClose={1500}
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
          <Route
            path="/ticket/*"
            element={<Ticket user={user} time={time} />}
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
