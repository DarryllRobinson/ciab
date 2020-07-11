import React from 'react';
import {Link} from 'react-router-dom';
import Login from './Auth/Login';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.menuToDisplay = this.menuToDisplay.bind(this);
  }

  menuToDisplay() {
    //console.log('NavBar props: ', this.props);
    const loggedInStatus = this.props.loggedInStatus;
    if (loggedInStatus === "LOGGED_IN" && this.props.role !== "god") {
      return (
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/community/blogs">Blogs <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard/">Dashboard <span className="sr-only"></span></Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/maintenance/policies">Maintenance <span className="sr-only"></span></Link>
            </li>
            <li>
              <button type="button" className="btn btn-secondary" onClick={() => this.props.handleLogoutClick()}>Logout</button>
            </li>
            </ul>
          </div>
      );
    } else if (loggedInStatus === "LOGGED_IN" && this.props.role === "god") {
      return (
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/community/blogs">Blogs <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard/">Dashboard <span className="sr-only"></span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/maintenance/policies">Maintenance <span className="sr-only"></span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/auth/registration">Registration <span className="sr-only"></span></Link>
          </li>
          <li>
            <button type="button" className="btn btn-secondary" onClick={() => this.props.handleLogoutClick()}>Logout</button>
          </li>
          </ul>
        </div>
      );
    } else if (loggedInStatus === 'NOT_LOGGED_IN') {
      return (
        <Login
          loggedInStatus={this.props.loggedInStatus}
          handleSuccessfulAuth={this.props.handleSuccessfulAuth}
          handleLogin={this.props.handleLogin}
          handleLogoutClick={this.props.handleLogoutClick}
        />
      );
    }
  }

    render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <Link className="navbar-brand" to="/">
          Customer Workflow System
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </Link>


            {this.menuToDisplay()}



      </nav>
    );
  }
}

export default NavBar;
