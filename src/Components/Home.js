import React, { Component } from 'react';
//import MysqlLayer from '../Utilities/MysqlLayer';
//import Registration from './Auth/Registration';
import Login from './Auth/Login';

class Home extends Component {
  constructor(props) {
    super(props);


    }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="jumbotron">
              <h1>Customer Workflow Solution</h1>
                <p className="lead">Your one-stop-shop for a complete customer lifecycle workflow solution</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <p className="lead">
                  <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p>
            </div>

            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action active">
                Application capture and processing - including scorecards
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Collection workflow to assist you with the inevitable
              </a>
              <a href="#" className="list-group-item list-group-item-action disabled">
                Ticket logging system to handle customer requests and complaints - includes automated escalation
              </a>
              <a href="#" className="list-group-item list-group-item-action disabled">
                Agent community with support for news articles, sharing information and assistance and blogs
              </a>
            </div>
          </div>


            <Login handleLogin={this.props.handleLogin} handleLogout={this.props.handleLogout} loggedInStatus={this.props.loggedInStatus} handleSuccessfulAuth={this.props.handleSuccessfulAuth} />


        </div>
      </div>
    )
  }
}

export default Home;
