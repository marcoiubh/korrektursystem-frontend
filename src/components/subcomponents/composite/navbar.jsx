import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/navbar.css';

const NavBar = ({ user }) => {
  return (
    <div className="navbar">
      <NavLink className="navbar__home" to="/">
        korrektursystem.live
      </NavLink>

      <NavLink className="navbar__tickets" to="/ticket/overview">
        Tickets
      </NavLink>

      {user ? (
        <>
          <span className="navbar__user">User: {user.email}</span>
          <NavLink className="navbar__login" to="/logout">
            Logout
          </NavLink>
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
