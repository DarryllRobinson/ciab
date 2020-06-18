import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Queues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const service = this.props.service;
    console.log('service: ', service);
    //let records = await this.mysqlLayer.Get(`/workspace/${service}`);
  }

  render() {
    return (

<>
      <div className="row">
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
                <span className="badge badge-primary badge-pill">{this.state.referred}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link className="nav-link" to={{
                    pathname: "/workspace",
                    state: 'Pended'
                  }}
                  style={{padding: 0}}>
                  Pended
                </Link>
                <span className="badge badge-primary badge-pill">{this.state.pended}</span>
              </li><li className="list-group-item d-flex justify-content-between align-items-center">
                <Link className="nav-link" to={{
                    pathname: "/workspace",
                    state: 'Decline Reviews'
                  }}
                  style={{padding: 0}}>
                  Decline Reviews
                </Link>
                <span className="badge badge-primary badge-pill">{this.state.reviews}</span>
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

      </div>
</>
  )
}

}

export default Queues;
