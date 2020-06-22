import React, { Component } from "react";
import MysqlLayer from '../../Utilities/MysqlLayer';
import Security from '../../Utilities/Security';
import moment from 'moment';
import bcrypt from 'bcryptjs';

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

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("b0oBi35", salt);

    console.log('Login hash: ', hash);

    bcrypt.compare(password, hash, (err, res) => {
      if (res) console.log('Passwords match')
      ;
    });

    const loginDatetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const user = {
      email: email,
      password: password,
      loginDate: loginDatetime
    };

    this.mysqlLayer.Post(`/admin/sessions`,
        user,
        { withCredentials: true }
      )
      .then(response => {
        if (response.data) {
          this.security.writeLoginSession(response.data[0].email, loginDatetime);
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
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

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
