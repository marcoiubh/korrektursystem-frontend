import { NavLink } from 'react-router-dom';
import React from 'react';
import '../../../css/footer.css';

const Footer = () => {
  return (
    <div className="app_footer">
      <span className="app_copyright">
        {/* Impressum Datenschutzerklärung Login für IU Mitarbeiter */}
        Copyright © 2022 IU Internationale Hochschule - All rights
        reserved
      </span>
      <NavLink className="app_issues" to="/issue">
        Issues
      </NavLink>
    </div>
  );
};

export default Footer;
