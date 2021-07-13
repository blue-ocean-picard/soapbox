import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = function() {
  return (
    <nav className='navigation-container'>
      <h3>Soapbox</h3>
      <ul className='navigation-links'>
        <Link className='nav-link' to='/register'>
          <li>Register</li>
        </Link>
        <Link className='nav-link' to='/login'>
          <li>Login</li>
        </Link>
        <Link className='nav-link' to='/logout'>
          <li>Logout</li>
        </Link>
      </ul>
    </nav>
  );
};