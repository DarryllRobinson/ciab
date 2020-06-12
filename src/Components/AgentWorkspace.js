import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import ComponentRoutes from '../Utilities/ComponentRoutes';
import Loader from './Loader';
import { Container } from 'react-bootstrap';

export default class AgentWorkspace extends React.Component {
  constructor() {
    super();

    this.state = {
      loaderOn: false //true
    }

    this.loaderOn = this.loaderOn.bind(this);
    this.loaderOff = this.loaderOff.bind(this);
  }

  loaderOn() {
    this.setState({ loaderOn: true });
  }

  loaderOff() {
    this.setState({ loaderOn: false });
  }
  render() {
    return (
      <Router>
        {/*
          this.state.loaderOn ? (<Loader />) : (<div></div>)
        */}

        <Header />

        <Container>
          <ComponentRoutes loaderOn={this.loaderOn} loaderOff={this.loaderOff} />
        </Container>
      </Router>
    );
  }
}
