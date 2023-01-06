import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/navbar.css';
import Button from '../atomic/Button';
import { deleteToken } from '../../../services/authenticationService';

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      {/* website */}
      <span className="navbar__home">korrektursystem.live</span>

      {/* ticket overview */}
      <NavLink className="navbar__tickets" to="/ticket/overview">
        Tickets
      </NavLink>

      {/* valid user */}
      {user ? (
        <>
          {/* email */}
          <span className="navbar__user">User: {user.email}</span>

          {/* time to log out */}
          <span className="navbar__ttl">{user.timeToLogout}</span>

          {/* logout */}
          <div className="navbar__logout">
            <Button label="Logout" onClick={deleteToken} />
          </div>
        </>
      ) : (
        // Login for non-valid users
        <NavLink className="navbar__login" to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;
