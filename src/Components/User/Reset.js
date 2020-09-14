import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import Toasts from '../../Utilities/Toasts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      updatedDate: '',
      updatedBy: '',
      resetErrors: '',
      clients: []
    }

    this.mysqlLayer = new MysqlLayer();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('Reset props: ', this.props);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    // Don't let the missing this.state.values confuse you below :)
    const {
      email,
      password,
      passwordConfirmation
    } = this.state;

    if (password === passwordConfirmation) {

      // bcrypt password
      const salt = bcrypt.genSaltSync(10);
      //const hash = bcrypt.hashSync("b0oBi35", salt);

      bcrypt.hash(password, salt, async (err, hash) => {
        //this.setState({ password: hash });

        const updatedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const updatedBy = email;

        const user = {
          email: email,
          password: hash,
          updatedDate: updatedDate,
          updatedBy: updatedBy
        };

        await this.mysqlLayer.PostChange(`/admin/user/change`, user, { withCredentials: true }
        ).then(response => {
          console.log('response: ', response);
          if (response.data === 'User not found') {
            //let message = 'User already exists. Please create a new username (email).';
            //this.handleFailedReg(message);
            Toasts('error', 'User not found. Please contact your supervisor.', false);
          } else if (response.data.affectedRows === 1) {
            Toasts('success', 'Your password has been reset. Please login to continue.', true);
          } else {
            console.log('Log error to resetErrors');
          }
        }).catch(error => {
          console.log('Reset error: ', error);
        });
      });
    } else {
      Toasts('error', 'The passwords do not match. Please try again.', true);
    }
  }

  render() {

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="emailInput">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="passwordInput">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="passwordConfirmationInput">
                <Form.Control
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password confirmation"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit"
            style={{
              background: "#48B711",
              borderColor: "#48B711"
            }}
          >
            Change password
          </Button>
        </Form>
        <ToastContainer />
      </Container>

    );
  }
}
