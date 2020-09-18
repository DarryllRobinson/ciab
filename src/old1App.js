import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import MysqlLayer from './Utilities/MysqlLayer';
import Security from './Utilities/Security';

import NavBar from './Components/NavBar';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

import Main from './Components/Main';
import Home from './Components/Home';
import Workspace from './Components/Workspace';

import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import NewApplication from './Components/Applications/NewApplication';

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

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  checkLoginStatus() {
    console.log('initial app state: ', this.state);
    this.security.checkLoginStatus(this.props);
  }

  async xxxcheckLoginStatus() {
    //if (this.state.loggedInStatus === "NOT_LOGGED_IN") this.props.history.push('/');
    this.security.validateSession();
    console.log('initial app state: ', this.state);
    let cwsUser = sessionStorage.getItem('cwsUser');

    if (cwsUser) {
      console.log('trying to get');
      await this.mysqlLayer.Get(`/admin/sessions/${cwsUser}`, { withCredentials: true })
       .then(response => {
         console.log('response: ', response);
         if (response[1].logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
           console.log('first option');
           this.setState({
             loggedInStatus: "LOGGED_IN",
             user: response[0]
           });
           console.log('App state: ', this.state);

         } else if (!response.logged_in && (this.state.loggedInStatus === "LOGGED_IN")) {
           console.log('second option');
           this.setState({
             loggedInStatus: "NOT_LOGGED_IN",
             user: {}
           });
           this.security.terminateSession();
           this.props.history.push('/');
         } else {
           console.log('something odd is happening here');
           this.security.terminateSession();
           this.props.history.push('/');
         }
       })
       .catch(error => {
         console.log("check login error", error);
         this.security.terminateSession();
         this.props.history.push('/');
       });
     } else {
       console.log('trying to push');
       this.security.terminateSession();
       this.props.history.push('/');
     }
 }

 componentDidMount() {
   this.checkLoginStatus();
 }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>

          <Route exact path='/' render={props => (<Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />)} />

          <Route exact path='/community/blogs' render={props => (<Blogs {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/community/blogs/:blogId' render={props => (<Blog {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/community/new-blog' render={props => (<NewBlog {...props} loggedInStatus={this.state.loggedInStatus} />)} />

          <Route exact path='/main' render={props => (<Main {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace' render={props => (<Workspace {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace/applications' render={props => (<Applications {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace/applications/:id' render={props => (<Application {...props} loggedInStatus={this.state.loggedInStatus} />)} />
          <Route exact path='/workspace/new-application' render={props => (<NewApplication {...props} loggedInStatus={this.state.loggedInStatus} />)} />


        </Switch>
      </div>
    )
  }
}

export default withRouter(App);
