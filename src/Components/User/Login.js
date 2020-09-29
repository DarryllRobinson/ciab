import React, { Component } from "react";
import MysqlLayer from '../../Utilities/MysqlLayer';
import Security from '../../Utilities/Security';
import ErrorReporting from '../../Utilities/ErrorReporting';
import Toasts from '../../Utilities/Toasts';
import moment from 'moment';
import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    this.errorReporting = new ErrorReporting();
    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  async sendEmail(event) {
    event.preventDefault();
    const email = this.state.email;
    await this.mysqlLayer.Post('/admin/user/reset', {email: email}, { withCredentials: true }
    ).then(response => {
      console.log('reset response');
    });
    Toasts('success', 'A reset email was sent', 3000);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    const loginDatetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const user = {
      email: email,
      password: password,
      loginDate: loginDatetime
    };


    await this.mysqlLayer.PostLogin(`/admin/sessions/`, user, { withCredentials: true }
    ).then(response => {
      //console.log('Login props: ', this.props);
      console.log('Login response.data: ', response.data);
      //console.log('response.data[0].active !== 1: ', response.data[0].active !== 1);
      if (response.data === undefined) {
        console.log('cannot connect');
        this.errorReporting.sendMessage(
          {
            error: 'Unable to login - no response data',
            fileName: 'Login.js',
            dateTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            user: sessionStorage.getItem('cwsUser'),
            state: JSON.stringify(this.state)
          }
        );
        Toasts('error', 'Unable to access the server. Please contact your administrator.', true);
      } else if (response.data[0].active !== 1) {
        Toasts('error', 'The user is not active', true);
      } else if (response.data[1].logged_in) {
        this.security.writeLoginSession(response.data, loginDatetime);
        this.props.handleSuccessfulAuth(response.data);
      } else {
        Toasts('error', 'Incorrect username or password', true);
        this.setState({ email: '', password: '' });
      }
    }).catch(error => {
      console.log('Login error: ', error);
    });
  }

  sectionToRender() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return (
        <>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  required
                />
              </Col>
              <Col>
                <Button
                  style={{
                    background: "#48B711",
                    borderColor: "#48B711",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </Col>

            </Row>
          </Form>


          <Accordion>
            <Accordion.Toggle as={Button} eventKey="0">
              Forgot password
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Form onSubmit={this.sendEmail}>
                <Row>
                  <Col>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      required
                    />
                  </Col>
                  <Col>
                    <Button
                      style={{
                        background: "#48B711",
                        borderColor: "#48B711",
                      }}
                      type="submit"
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Accordion.Collapse>
          </Accordion>


          <ToastContainer />
        </>
      );
    } else if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <button type="button" className="btn btn-secondary" onClick={() => this.props.handleLogoutClick()}>Logout</button>
      );
    } else {
      return (
        <div>loggedInStatus is confused</div>
      );
    }
  }

  render() {
    //console.log('Login props: ', this.props);
    return (
      <>

        {this.sectionToRender()}
        </>

  )}
}
