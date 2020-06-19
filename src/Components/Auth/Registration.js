import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      surname: '',
      username: '',
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      surname: this.state.surname,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      role: this.state.role,
      f_clientId: this.state.f_clientId,
      createdDate: this.state.createdDate
    }

    this.mysqlLayer.Post(`/admin/users`, user, { withCredentials: true }
    ).then(response => {
      console.log('Registration response: ', response);
    }).catch(error => {
      console.log('Registration error: ', error);
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
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
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
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={this.state.role}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="f_clientId"
            placeholder="Client ID"
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
