import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand left" to="/">
        korrektursystem.live
      </NavLink>
      <NavLink className="navbar-brand active right" to="/tickets">
        Tickets
      </NavLink>
      <NavLink className="navbar-brand active " to="/login">
        Login
      </NavLink>
    </nav>
  );
};

export default NavBar;
