import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="logo">
      <Link className="navbar-brand" to="/">
        <img
          className="logo-light"
          title="Logo"
          alt="Logo"
          src="/images/dd.ico"
        />
      </Link>
    </div>
  );
}
