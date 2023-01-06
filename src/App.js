import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import MysqlLayer from './Utilities/MysqlLayer';
import Security from './Utilities/Security';
import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './Components/NavBar';
import Home from './Components/Home';
import Footer from './Components/Footer';
//import NewHome from './Components/newHome';

import Dashboard from './Components/Dashboard';
import Workzone from './Components/Workzone';
//import CollectionsWorkspace from './Components/CollectionsWorkspace';

//import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import NewApplication from './Components/Applications/NewApplication';

import Collection from './Components/Collections/Collection';
import Contacts from './Components/Collections/editContacts';
import Payment from './Components/Collections/Payment';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

// User admin
import UserRegistration from './Components/User/Registration';
import UserAdmin from './Components/User/Admin';
import Reset from './Components/User/Reset';

// Client admin
import ClientRegistration from './Components/Client/Registration';
import ClientAdmin from './Components/Client/Admin';

import ExcelReader from './Utilities/ExcelReader';
import Reports from './Components/Reports';

// Salesforce
import Salesforce from './Components/Salesforce/Salesforce';

//import 'bootstrap/dist/css/bootstrap.min.css';

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
    this.checkLoginStatus();
  }

  render() {
    let role = sessionStorage.getItem('cwsRole') ? sessionStorage.getItem('cwsRole') : this.state.user.role;
    let user = this.state.user;
    let loggedInStatus = this.state.loggedInStatus;
    // Return profile aligned to cwsRole
    switch (role) {
      case 'superuser': return (
        <Container fluid>
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
            <Route exact path='/payment' render={props => (<Payment {...props} user={user} loggedInStatus={loggedInStatus} />)} />
            <Route exact path='/workzone/applications' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}
            <Route exact path='/workspace/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/workzone/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/collections/contacts/:id' render={props => (<Contacts {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

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

            <Route exact path='/user/registration' render={props => (<UserRegistration {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/user/admin' render={props => (<UserAdmin {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/client/registration' render={props => (<ClientRegistration {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/client/admin' render={props => (<ClientAdmin {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />


            <Route exact path='/reports' render={props => (<Reports {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/collections/upload' render={props => (<ExcelReader {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            <Route exact path='/salesforce' render={props => (<Salesforce {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>

          <Footer />
        </Container>
      );
      case 'store': return (
        <Container fluid>
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

          <Footer />
        </Container>
      );
      case 'kam': return (
        <Container fluid>
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

            <Route exact path='/workzone/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/collections' render={props => (<Collections {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            <Route exact path='/community/blogs' render={props => (<Blogs {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/collections/upload' render={props => (<ExcelReader {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>

          <Footer />
        </Container>
      );
      case 'agent': return (
        <Container fluid>
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

            <Route exact path='/workzone/collections/collection/:id' render={props => (<Collection {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/applications/application/:id' render={props => (<Application {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

            {/*<Route exact path='/workspace/collections' render={props => (<Collections {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />*/}

            <Route exact path='/community/blogs' render={props => (<Blogs {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/collections/upload' render={props => (<ExcelReader {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />

          </Switch>

          <Footer />
        </Container>
      );
      case 'client': return (
        <Container fluid>
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
            <Route exact path='/collections/upload' render={props => (<ExcelReader {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/reports' render={props => (<Reports {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />
            <Route exact path='/workzone/collections' render={props => (<Workzone {...props} user={this.state.user} loggedInStatus={this.state.loggedInStatus} />)} />


          </Switch>

          <Footer />
        </Container>
      );
      default: return (
        <Container fluid>
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

            <Route exact path='/reset' render={props => (
              <Reset {...props}
                loggedInStatus={this.state.loggedInStatus}
              />)}
            />
          </Switch>

          <Footer />
        </Container>
      )

    }

  }
}

export default withRouter(App);
