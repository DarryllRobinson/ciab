import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../Utilities/MysqlLayer';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      role: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {

  }

  render() {
    return (
      <div> {/* Heading */}
        <div className="row">
          <div className="lead">
            <h1 className="display-5">Welcome to your workspace</h1>
            <p className="lead">{`It will provide you with an overview of what's happening and is where you will start your day`}</p>
            <hr className="my-4" />
          </div>
        </div>

        <div className="row"> {/* Queues */}
          <div className="col-lg-4">
            <div className="bs-component">
              <ul className="list-group">
              <p className="lead">Queues</p>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <Link className="nav-link" to={{
                      pathname: "/workspace",
                      state: 'Referred'
                    }}
                    style={{padding: 0}}>
                    Referred
                  </Link>
                  <span className="badge badge-primary badge-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <Link className="nav-link" to="/workspace/applications" style={{padding: 0}}>Pended</Link>
                  <span className="badge badge-primary badge-pill">2</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <Link className="nav-link" to="/workspace/applications" style={{padding: 0}}>Decline Review</Link>
                  <span className="badge badge-primary badge-pill">1</span>
                </li>
              </ul>
            </div>
          </div>



          <div className="col-lg-4"> {/* Community */}
            <div className="bs-component">
              <ul className="list-group">
                <p className="lead">Community</p>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Your badges
                  <span className="badge badge-primary badge-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  New publishings
                  <span className="badge badge-primary badge-pill">2</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Top topic
                  <span className="badge badge-primary badge-pill">1</span>
                </li>
              </ul>
            </div>
          </div>



          <div className="col-lg-4"> {/* Something else? */}
            <div className="bs-component">
              <ul className="list-group">
              <p className="lead">TBC</p>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Cras justo odio
                  <span className="badge badge-primary badge-pill">14</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Dapibus ac facilisis in
                  <span className="badge badge-primary badge-pill">2</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Morbi leo risus
                  <span className="badge badge-primary badge-pill">1</span>
                </li>
              </ul>
            </div>
          </div>

        </div> {/* Row div */}

      </div>
    )
  }
}

export default Main;
