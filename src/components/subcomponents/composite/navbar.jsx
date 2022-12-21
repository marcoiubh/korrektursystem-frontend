import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/navbar.css';

const NavBar = ({ user }) => {
  return (
    <nav className="app_navbar">
      <NavLink className="app_navbar_text app_home" to="/">
        korrektursystem.live
      </NavLink>

      <NavLink
        className="app_navbar_text app_tickets"
        to="/ticket/overview"
      >
        Tickets
      </NavLink>

      {user ? (
        <>
          <span className="app_navbar_text app_user">
            User: {user}
          </span>
          <NavLink
            className=" app_navbar_text app_login_link"
            to="/logout"
          >
            Logout
          </NavLink>
        </>
      ) : (
        <NavLink
          className="app_navbar_text app_login_link"
          to="/login"
        >
          Login
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
