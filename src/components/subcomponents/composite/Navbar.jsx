import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/navbar.css';
import Button from '../atomic/Button';
import { deleteToken } from '../../../services/authenticationService';

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      <span className="navbar__home">korrektursystem.live</span>

      <NavLink className="navbar__tickets" to="/ticket/overview">
        Tickets
      </NavLink>

      {user ? (
        <>
          <span className="navbar__user">User: {user.email}</span>
          <span className="navbar__ttl">{user.timeToLogout}</span>

          <div className="navbar__logout">
            <Button label="Logout" onClick={deleteToken} />
          </div>
        </>
      ) : (
        <NavLink className="navbar__login" to="/login">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;