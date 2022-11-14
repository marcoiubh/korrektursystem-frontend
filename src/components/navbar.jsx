import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand left" to="/">
        korrektursystem.live
      </NavLink>
      <NavLink className="navbar-brand active right" to="/tickets">
        Tickets
      </NavLink>
      {!user && (
        <NavLink className="navbar-brand active " to="/login">
          Login
        </NavLink>
      )}
      {user && (
        <div>
          <span className="navbar-brand active ">User: {user}</span>
          <NavLink className="navbar-brand active " to="/logout">
            Logout
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
