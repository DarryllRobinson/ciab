import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import MysqlLayer from './Utilities/MysqlLayer';
import Security from './Utilities/Security';
import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { authenticationService } from './Services';
import { PrivateRoute } from './Services';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Footer from './Components/Footer';
//import NewHome from './Components/newHome';

import Dashboard from './Components/Dashboard';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  async handleLogin(data) {
    //console.log('handleLogin data: ', data);
    await this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
    //console.log('updated handleLogin data: ', data);
  }

  async handleLogout() {
    await this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
    this.security.terminateSession();
    this.props.history.push('/');
  }

  async handleLogoutClick() {
    this.handleLogout();
  }

  async checkLoginStatus() {
    //console.log('checkLoginStatus ', this.props.history.location.pathname);
    let sessionUser = sessionStorage.getItem('cwsUser');

    if (sessionUser && this.state.loggedInStatus === "NOT_LOGGED_IN") {
      let data = {
        firstName: sessionStorage.getItem('cwsFirstName'),
        surname: sessionStorage.getItem('cwsSurname'),
        email: sessionStorage.getItem('cwsUser'),
        role: sessionStorage.getItem('cwsRole'),
        storeId: sessionStorage.getItem('cwsStoreId'),
        clientId: sessionStorage.getItem('cwsClient')
      };
      await this.handleLogin(data);
      this.security.validateSession();
      //console.log('Logged back in');
    } else if (!sessionUser && (this.state.loggedInStatus === "LOGGED_IN")) {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      });
      this.props.history.push('/');
      this.forceUpate();
    }
  }

  async handleSuccessfulAuth(data) {
    //console.log('handleSuccessfulAuth data: ', data);
    await this.handleLogin(data);
    //console.log('pushing to dashboard with :', this.state.loggedInStatus);
    //console.log('App this.props.history: ', this.props.history);
    if (this.props.history.location.pathname === '/') this.props.history.push('/dashboard');
  }

  componentDidMount() {
    //console.log('App mounted: ', this.state.loggedInStatus);
    localStorage.setItem('currentUser', 'Darryll');
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: null,
      //isAdmin: x && x.role === Role.Admin
    }));
    this.checkLoginStatus();
  }

  render() {
    const currentUser = authenticationService.currentUserValue;

    return (
      <Container fluid>
        <NavBar {...this.props}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleLogoutClick={this.handleLogoutClick}
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulAuth={this.handleSuccessfulAuth}
          role={this.state.user.role}
        />
        <div>Here we go, {currentUser}!</div>
        <Switch>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route path="/home" component={Home} />
        </Switch>
        <Footer />
      </Container>
    )
  }
}


export default withRouter(App);
