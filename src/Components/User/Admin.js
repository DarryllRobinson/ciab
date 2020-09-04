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
    this.loadUsers = this.loadUsers.bind(this);
  }

  async componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    //console.log('loading users');
    const clientId = sessionStorage.getItem('cwsClient');
    await this.mysqlLayer.Get(`/admin/users/${clientId}`
    ).then(users => {
      this.setState({
        //update: true,
        users: users
      });
    });

  }

  async deleteUser(user) {
    await this.mysqlLayer.Delete(`/admin/user/${user}`
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
    if (!this.state.users) {
      return (
        <div>Loading users...</div>
      )
    } else {
      const users = this.state.users.map((user, idx) => {
        const userId = user.id;
        return (
          <tr key={idx}>
            <td key={idx+3}>{user.email}</td>
            <td key={idx+1}>{user.firstName}</td>
            <td key={idx+2}>{user.surname}</td>
            <td key={idx+4}>{user.role}</td>
            <td>
              <Button
                style={{
                  background: "#48B711",
                  borderColor: "#48B711"
                }}
                size="sm"
                onClick={() => this.deleteUser(userId)}
              >
                Delete
              </Button>
            </td>
          </tr>
        )}
      );

      return (
        <Container>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Surname</th>
                <th>Role</th>
                <th>Delete user</th>
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
            <Registration loadUsers={this.loadUsers}/>
            </Accordion.Collapse>
          </Accordion>

          <ToastContainer />
        </Container>
      )
    }
  }
}

export default Admin;
