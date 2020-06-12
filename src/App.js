import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Blogs from './Components/Community/Blogs';
import Blog from './Components/Community/Blog';
import NewBlog from './Components/Community/NewBlog';

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
      </div>
    )
  }
}

export default withRouter(App);
