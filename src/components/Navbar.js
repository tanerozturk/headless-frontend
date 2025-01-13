// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/tours" className="nav-link">Tours</Link>
        </li>
        <li className="nav-item">
          <Link to="/locations" className="nav-link">Locations</Link>
        </li>
        <li className="nav-item">
          <Link to="/about-us" className="nav-link">About Us</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact-us" className="nav-link">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
