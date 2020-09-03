import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import { Accordion, Button, Container, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toasts from '../../Utilities/Toasts';
import Registration from './Registration';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: false,
      users: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {
    this.loadUsers(true);
  }

  async loadUsers(update) {
    if (update) {
      console.log('loading users');
      const clientId = sessionStorage.getItem('cwsClient');
      let users = await this.mysqlLayer.Get(`/admin/users/${clientId}`);
      this.setState({ users: users });
    }

  }

  async deleteUser(user) {
    await this.mysqlLayer.Delete(`/admin/user/${user}1`
    ).then(response => {
      //console.log('response: ', response);
      if (response.affectedRows === 1) {
        Toasts('success', 'The user was deleted', true);
        this.loadUsers();
      } else {
        Toasts('error', 'There was a problem deleting the user', false);
      }
    });
  }

  render() {
    if (this.state.users) {
      const users = this.state.users.map((user, idx) => {
        const userId = user.id;
        return (
          <tr key={idx}>
            <td key={idx+1}>{user.firstName}</td>
            <td key={idx+2}>{user.surname}</td>
            <td key={idx+3}>{user.email}</td>
            <td key={idx+4}>{user.role}</td>
            <td>
              <Button variant="primary" size="sm"
                onClick={() => this.deleteUser(userId)}
              >
                Delete
              </Button>
            </td>
            <td>reset button</td>
          </tr>
        )}
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
                <th>Delete user</th>
                <th>Reset password</th>
              </tr>
            </thead>
            <tbody>
                {users}
            </tbody>
          </Table>

          <Accordion>
            <Accordion.Toggle as={Button} eventKey="0">
              Add user
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
            <Registration loadUsers={this.loadUsers()}/>
            </Accordion.Collapse>
          </Accordion>
          <ToastContainer />






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
