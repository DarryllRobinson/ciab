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
    this.handleLogoutClick = this.handleLogoutClick.bind(this);

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
        console.log('handleSubmit response: ', response);
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

  async handleLogoutClick() {
    console.log('Home props: ', this.props);
    let cwsUser = sessionStorage.getItem('cwsUser');
    await this.mysqlLayer.Delete(`/admin/sessions/${cwsUser}`, { withCredentials: true })
    .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  sectionToRender() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return (
        <div className="form-group">
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <button className="btn btn-secondary" type="submit">Login</button>
          </form>
        </div>
      );
    } else if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <button type="button" className="btn btn-secondary" onClick={() => this.handleLogoutClick()}>Logout</button>
      );
    } else {
      return (
        <div>loggedInStatus is confused</div>
      );
    }
  }

  render() {
    console.log('Login props: ', this.props);
    return (
      <div className="col-lg-2">
        <small className="text-muted">Status: {this.props.loggedInStatus}</small>

        <br /><br />
        {this.sectionToRender()}

    </div>
  )}
}
