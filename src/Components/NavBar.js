import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/main">
        Customer in a Box
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </Link>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/community/blogs">Blogs <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/workspace/applications">Applications <span className="sr-only"></span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/maintenance/policies">Maintenance <span className="sr-only"></span></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
