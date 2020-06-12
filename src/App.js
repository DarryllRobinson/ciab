import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Blogs from './Components/Community/Blogs';

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
        <Route exact path='/communtity/blogs' component={Blogs} />
      </div>
    )
  }
}

export default withRouter(App);
