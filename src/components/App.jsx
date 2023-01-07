import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getCurrentUser } from '../services/authenticationService';
import useRefresh from '../services/useRefresh';
import ExpiredSession from './administration/ExpiredSession';
import Issue from './administration/Issue';
import Login from './administration/Login';
import Footer from './subcomponents/composite/Footer';
import NavBar from './subcomponents/composite/Navbar';
import NewTicket from './ticket/NewTicket';
import TicketController from './ticket/TicketController';

function App() {
  // set global background-color
  document.body.style.backgroundColor = '#242629';

  // auto refresh every second
  const time = useRefresh();

  // disable notification queue
  toast.clearWaitingQueue();

  // get user object
  let user = getCurrentUser();

  return (
    <div className='container'>
      {/* notification */}
      <ToastContainer
        transition={Slide}
        limit={1}
        position='top-right'
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='dark'
      />

      {/* navigation bar */}
      <NavBar user={user} />

      {/* valid user */}
      {user ? (
        <Routes>
          {/* arbitrary urls */}
          <Route
            path='*'
            element={<Navigate to='/ticket/overview' />}
          />
          {/* /ticket urls */}
          <Route
            path='/ticket/*'
            element={
              <TicketController
                user={user}
                time={time}
              />
            }
          />

          {/* new ticket - students only */}
          {user.role === 'student' ? (
            <Route
              path='/new'
              element={<NewTicket user={user} />}
            />
          ) : null}

          {/* contact */}
          <Route
            path='/issue'
            element={<Issue />}
          />
        </Routes>
      ) : (
        // non-valid users
        <Routes>
          {/* expired token */}
          <Route
            path='/expiredSession'
            element={<ExpiredSession />}
          />

          {/* arbitrary urls */}
          <Route
            path='/*'
            element={<Login />}
          />
        </Routes>
      )}

      <Footer />
    </div>
  );
}

export default App;
