import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import MysqlLayer from './Utilities/MysqlLayer';
import Security from './Utilities/Security';

import NavBar from './Components/NavBar';
import Home from './Components/Home';

import Dashboard from './Components/Dashboard';
import Workspace from './Components/Workspace';

import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import NewApplication from './Components/Applications/NewApplication';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

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
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }

  async handleLogout() {
    await this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  async checkLoginStatus() {
    console.log('initial app state: ', this.state);
    let cwsUser = '';
    cwsUser = sessionStorage.getItem('cwsUser');
    console.log('cwsUser: ', cwsUser);

    await this.mysqlLayer.Get(`/admin/sessions/${cwsUser}`, { withCredentials: true })
      .then(async response => {
        if (response[1].logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
          console.log('Logging in...');
          await this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response[0]
          });
          console.log('Logged in app state: ', this.state);

        } else if (
          !response[1].logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          console.log('Logging out...');
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          });
          //this.props.history.push('/');
          //this.forceUpate();
        }
     })
     .catch(error => {
       console.log("check login error", error);
     });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>

          <Route exact path='/' render={props => (
            <Home {...props}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
            />)}
          />

          <Route exact path='/dashboard' render={props => (<Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace' render={props => (<Workspace {...props} loggedInStatus={this.state.loggedInStatus} />)} />

          <Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />

          <Route exact path='/community/blogs' render={props => (<Blogs {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/community/new-blog' render={props => (<NewBlog {...props} loggedInStatus={this.state.loggedInStatus} />)} />

        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
