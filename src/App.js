import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

import Main from './Components/Main';
import Workspace from './Components/Workspace';

import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import Approved from './Components/Applications/Approved';
import Referred from './Components/Applications/Referred';
import Declined from './Components/Applications/Declined';
import NewApplication from './Components/Applications/NewApplication';

import Registration from './Components/Auth/Registration';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/community/blogs' component={Blogs} />
        <Route exact path='/community/blogs/:blogId' component={Blog} />
        <Route exact path='/community/new-blog' component={NewBlog} />

        <Route exact path='/main' component={Main} />
        <Route exact path='/workspace' component={Workspace} />
        <Route exact path='/workspace/applications' component={Applications} />
        <Route exact path='/workspace/applications/:id' component={Application} />
        <Route exact path='/workspace/applications/approved' component={Approved} />
        <Route exact path='/workspace/applications/referred' component={Referred} />
        <Route exact path='/workspace/applications/declined' component={Declined} />
        <Route exact path='/workspace/new-application' component={NewApplication} />

        <Route exact path='/' component={Registration} />
      </div>
    )
  }
}

export default withRouter(App);
