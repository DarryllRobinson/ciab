import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import { Button, Container, Table } from 'react-bootstrap';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const clientId = sessionStorage.getItem('cwsClient');
    let users = await this.mysqlLayer.Get(`/admin/users/${clientId}`);
    this.setState({ users: users });
  }

  render() {
    if (this.state.users) {
      const users = this.state.users.map((user, idx) =>
        <tr key={idx}>
          <td key={idx+1}>{user.firstName}</td>
          <td key={idx+2}>{user.surname}</td>
          <td key={idx+3}>{user.email}</td>
          <td key={idx+4}>{user.role}</td>
          <td><Button variant="primary" size="sm" >
    Delete
  </Button></td>
          <td>reset button</td>
        </tr>
      );

      return (
        <Container>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>First name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Role</th>
                <th col="2">Actions</th>
              </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
          </Table>
        </Container>
      )
    } else {
      return (
        <div>Loading users...</div>
      )
    }
  }
}

export default Admin;
