import React from 'react';
import { Navbar, Button, Form, FormControl, Nav, NavDropdown } from 'react-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super();

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    window.location = '/';
  }

  render() {
    let userType = 'agent'; //sessionStorage.getItem('foneBookUserType');

    function getAccessPaths() {
      switch (userType) {
        case 'agent':
          return (
            <Nav.Link href="/workspace/creditvet">Credit Applications</Nav.Link>
          )
        case 'god':
          return (
            <Nav.Link href="#link">Collections</Nav.Link>
          )
          break;
        default:
          return null;
      }
    }

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Customer in a Box</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {
              getAccessPaths()
            }
          </Nav>
          <NavDropdown title={userType} id="basic-nav-dropdown">
            <NavDropdown.Item href="profile">Manage profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout">Log Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
