import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../css/footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      {/* copyright */}
      <span className='footer__copyright'>
        Copyright © 2022 IU Internationale Hochschule - All rights reserved
      </span>

      {/* issues */}
      <NavLink
        className='footer__issues'
        to='/issue'
      >
        Issues
      </NavLink>
    </div>
  );
};

export default Footer;
