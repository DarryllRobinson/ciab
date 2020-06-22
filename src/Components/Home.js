import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Registration from './Auth/Registration';
import Login from './Auth/Login';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.mysqlLayer = new MysqlLayer();
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push('main');
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

  render() {
    return (
      <div className="container">
        <div className="cols-12">
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <br /><br />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        </div>
      </div>
    )
  }
}

export default Home;
