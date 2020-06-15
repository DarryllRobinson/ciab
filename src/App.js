import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar';

import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

import Applications from './Components/Applications/Applications';
import Application from './Components/Applications/Application';
import Approved from './Components/Applications/Approved';
import NewApplication from './Components/Applications/NewApplication';

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

        <Route exact path='/workspace/applications' component={Applications} />
        <Route exact path='/workspace/applications/:applicationId' component={Application} />
        <Route exact path='/workspace/applications/approved' component={Approved} />
        <Route exact path='/workspace/new-application' component={NewApplication} />
      </div>
    )
  }
}

export default withRouter(App);
