import { NavLink } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <NavLink className="text-muted " to="/contact">
          Issues
        </NavLink>
        <div> </div>
        <span className="text-muted">
          {/* Impressum Datenschutzerklärung Login für IU Mitarbeiter */}
          Copyright © 2022 IU Internationale Hochschule - All rights
          reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
