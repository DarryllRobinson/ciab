import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import { Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const clientId = sessionStorage.getItem('cwsClient');
    let users = await this.mysqlLayer.Get(`/admin/users/${clientId}`);
    this.setState({ users: users });
  }

  async deleteUser(user) {
    await this.mysqlLayer.Delete(`/admin/user/${user}`
    ).then(response => {
      console.log('response: ', response);
      if (response.affectedRows === 1) {
        this.notify('success', 'The user was deleted', true);
        this.loadUsers();
      } else {
        this.notify('error', 'There was a problem deleting the user', false);
      }
    });
  }

  notify(type, message, autoClose) {
    switch (type) {
      case 'info':
        toast.info(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'success':
        toast.success(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1
        });
        break;
      case 'warn':
        toast.warn(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'error':
        toast.error(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'default':
        toast(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1
        });
        break;
      default:
        toast('No type selected', {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
    }
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
