import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';
import bcrypt from 'bcryptjs';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      role: '',
      f_clientId: '',
      createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      registrationErrors: ''
    }

    this.mysqlLayer = new MysqlLayer();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.checkPassword = this.checkPassword.bind(this);


  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    // bcrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("b0oBi35", salt);
    
    bcrypt.hash(this.state.password, salt, async (err, hash) => {
       await this.setState({ password: hash });
       console.log('hashed password: ', this.state.password);

       const user = {
         firstName: 'Steven',//this.state.firstName,
         surname: 'Strange', //this.state.surname,
         email: 'steven@email.com', //this.state.email,
         phone: '0123555555', //this.state.phone,
         password: this.state.password,
         role: 'agent', //this.state.role,
         f_clientId: 3, //this.state.f_clientId,
         createdDate: this.state.createdDate
       }

       console.log('user: ', user);

       this.mysqlLayer.Post(`/admin/users`, user, { withCredentials: true }
       ).then(response => {
         console.log('Registration response: ', response.config.data);
         if (response) {
           this.props.handleSuccessfulAuth(response.config.data);
         } else {
           console.log('Log error to registrationErrors');
         }
       }).catch(error => {
         console.log('Registration error: ', error);
       });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={this.state.surname}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="email@email.com" //"Email address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile"
            value={this.state.phone}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="agent" //"Role"
            value={this.state.role}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="f_clientId"
            placeholder="3" //"Client ID"
            value={this.state.f_clientId}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
