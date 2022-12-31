import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <span className="footer__copyright">
        {/* Impressum Datenschutzerklärung Login für IU Mitarbeiter */}
        Copyright © 2022 IU Internationale Hochschule - All rights
        reserved
      </span>
      <NavLink className="footer__issues" to="/issue">
        Issues
      </NavLink>
    </div>
  );
};

export default Footer;
