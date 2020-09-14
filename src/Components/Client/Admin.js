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
      clients: null
    }

    this.mysqlLayer = new MysqlLayer();
    this.loadClients = this.loadClients.bind(this);
  }

  async componentDidMount() {
    this.loadClients();
  }

  async loadClients() {
    await this.mysqlLayer.Get(`/admin/clients`
    ).then(clients => {
      this.setState({
        //update: true,
        clients: clients
      });
    });

  }

  async deleteUser(client) {
    await this.mysqlLayer.Delete(`/admin/client/${client}`
    ).then(response => {
      //console.log('response: ', response);
      if (response.affectedRows === 1) {
        Toasts('success', 'The client was deleted', true);
        this.loadClients();
      } else {
        Toasts('error', 'There was a problem deleting the client', false);
      }
    });
  }

  render() {
    if (!this.state.clients) {
      return (
        <div>Loading clients...</div>
      )
    } else {
      const clients = this.state.clients.map((client, idx) => {
        const clientId = client.id;
        return (
          <tr key={idx}>
            <td key={idx+1}>{client.name}</td>
            <td key={idx+2}>{client.regNum}</td>
            <td key={idx+3}>{client.mainContact}</td>
            <td key={idx+4}>{client.email}</td>
            <td key={idx+5}>{client.phone}</td>
            <td>
              <Button
                style={{
                  background: "#48B711",
                  borderColor: "#48B711"
                }}
                size="sm"
                onClick={() => this.deleteUser(clientId)}
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
                <th>Name</th>
                <th>Registration number</th>
                <th>Main contact</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Delete client</th>
              </tr>
            </thead>
            <tbody>
              {clients}
            </tbody>
          </Table>

          <Accordion>
            <Accordion.Toggle as={Button} eventKey="0">
              Add client
            </Accordion.Toggle>

            <Accordion.Collapse eventKey="0">
            <Registration loadClients={this.loadClients}/>
            </Accordion.Collapse>
          </Accordion>

          <ToastContainer />
        </Container>
      )
    }
  }
}

export default Admin;
