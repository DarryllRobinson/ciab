import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

export default class Reset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

  handleSubmit(event) {
    event.preventDefault();

    // Don't let the missing this.state.values confuse you below :)
    const {
      email
    } = this.state;

    // bcrypt password
    const salt = bcrypt.genSaltSync(10);
    //const hash = bcrypt.hashSync("b0oBi35", salt);

    bcrypt.hash(this.state.password, salt, (err, hash) => {
       this.setState({ password: hash });
       //console.log('hashed password: ', this.state.password);

       const updatedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
       const updatedBy = email;

       const user = {
         password: hash,
         updatedDate: updatedDate,
         updatedBy: updatedBy
       }

       this.mysqlLayer.Post(`/admin/user/change/${email}`, user, { withCredentials: true }
       ).then(response => {
         console.log('response: ', response);
         if (response.data === 'user exists') {
           let message = 'User already exists. Please create a new username (email).';
           this.handleFailedReg(message);
         } else if (response.data.affectedRows === 1) {
           this.handleSuccessfulAuth();
         } else {
           console.log('Log error to resetErrors');
         }
       }).catch(error => {
         console.log('Registration error: ', error);
       });
    });
  }


  handleFailedReg(message) {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  handleSuccessfulAuth() {
    toast(`${this.state.firstName} has been added to the system`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    this.setState({
      firstName: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      storeId: '',
      type: '',
      f_clientId: '',
      updatedDate: ''
    });
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
