import React, { Component } from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top top-header">
      <div className="container-fluid central">
        <Link to="/" className="navbar-brand">
          Tutorials
        </Link> 
      </div>
    </nav>
  );
}

export default Header;
