import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import MysqlLayer from './Utilities/MysqlLayer';
import Security from './Utilities/Security';

import NavBar from './Components/NavBar';
import Home from './Components/Home';

import Dashboard from './Components/Dashboard';
import Workzone from './Components/Workzone';
//import CollectionsWorkspace from './Components/CollectionsWorkspace';

//import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import NewApplication from './Components/Applications/NewApplication';

import Collection from './Components/Collections/Collection';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

import Registration from './Components/Auth/Registration';

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
      await this.setState({
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
    this.props.history.push('/dashboard');
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    let role = sessionStorage.getItem('cwsRole') ? sessionStorage.getItem('cwsRole') : this.state.user.role;
    let user = this.state.user;
    let loggedInStatus = this.state.loggedInStatus;
    // Return profile aligned to cwsRole
    switch (role) {
      case 'god': return (
        <div>
          <NavBar {...this.props}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleLogoutClick={this.handleLogoutClick}
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            role={this.state.user.role}
          />
          <Switch>

            <Route exact path='/' render={props => (
              <Home {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />)}
            />

            {/*<Route exact path='*' render={props => (<Dashboard {...props} user={user} loggedInStatus={loggedInStatus} />)} />*/}


            <Route exact path='/dashboard' render={props => (<Dashboard {...props} user={user} loggedInStatus={loggedInStatus} />)} />
            <Route exact path='/workzone/consumer/applications' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/consumer/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/workzone/business/applications' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/business/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}
            <Route exact path='/:type/:workspace/:workrecord/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            {/*<Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            {/*<Route exact path='/consumer/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            {/*<Route exact path='/workspace/collections' render={props => (<Collections {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            <Route exact path='/community/blogs' render={props => (<Blogs {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/new-blog' render={props => (<NewBlog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/auth/registration' render={props => (<Registration {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>
        </div>
      );
      case 'store': return (
        <div>
          <NavBar {...this.props}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleLogoutClick={this.handleLogoutClick}
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            role={this.state.user.role}
          />
          <Switch>

            <Route exact path='/' render={props => (
              <Home {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />)}
            />

            <Route exact path='/dashboard' render={props => (<Dashboard {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/applications' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}
            <Route exact path='/workspace/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/workspace/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/collections' render={props => (<Collections {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            <Route exact path='/community/blogs' render={props => (<Blogs {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>
        </div>
      );
      case 'agent': return (
        <div>
          <NavBar {...this.props}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleLogoutClick={this.handleLogoutClick}
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            role={this.state.user.role}
          />
          <Switch>

            <Route exact path='/' render={props => (
              <Home {...props}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedInStatus={this.state.loggedInStatus}
              />)}
            />

            <Route exact path='/dashboard' render={props => (<Dashboard {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/applications' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}
            <Route exact path='/workspace/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/workspace/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/collections' render={props => (<Collections {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            <Route exact path='/community/blogs' render={props => (<Blogs {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>
        </div>
      );
      default: return (
        <div>
          <NavBar {...this.props}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            handleLogoutClick={this.handleLogoutClick}
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            role={this.state.user.role}
          />

          <Route exact path='/' render={props => (
            <Home {...props}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              loggedInStatus={this.state.loggedInStatus}
            />)}
          />
        </div>
      )

    }

  }
}

export default withRouter(App);
