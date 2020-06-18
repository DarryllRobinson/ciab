import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../Utilities/MysqlLayer';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,  // passed in from login - to be created still
      user: null,
      client: null,
      role: 'god',  // passed in from login - to be created still
      referred: 0,
      pended: 0,
      reviews: 0,
      services: []
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    // get user fields from table
    const user = await this.mysqlLayer.Get(`/admin/users/${this.state.userId}`);

    // get client from user who logged in
    const client = await this.mysqlLayer.Get(`/admin/clients/${user[0].f_clientId}`);

    // has client paid? - still thinking about this one...
    if (client[0].hasPaid === 0) this.props.history.push(`/admin/arrears`);

    // what services are turned on? There must be a better way to do this, I just can't think of one right now
    const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${user[0].f_clientId}`);

    let cs = [];
    clientservices.forEach(service => {
      cs.push(service.service);
    });

    // load everything into state
    await this.setState({
      user: user,
      client: client,
      services: cs
    });
  }

  render() {
    return (
      <div className="container">
        <div className="cols-12">


        {/* Welcome  */}
          <div className="row">
            <div className="lead">
              <h1 className="display-5">Welcome to your workspace</h1>
              <p className="lead">{`It will provide you with an overview of what's happening and is where you will start your day`}</p>
              <hr className="my-4" />
            </div>
          </div>

          {/* Workspace  */}
          <div className="row">

            {/* Queues  */}
            <div className="col-lg-4">
              <div className="bs-component">
                <ul className="list-group">
                  <p className="lead">Queues</p>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Link className="nav-link" to={{
                        pathname: "/workspace",
                        state: 'Referred'
                      }}
                      style={{padding: 0}}
                    >
                    Referred
                    </Link>
                    <span className="badge badge-primary badge-pill">12</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Link className="nav-link" to={{
                        pathname: "/workspace",
                        state: 'Pended'
                      }}
                      style={{padding: 0}}
                    >
                    Pended
                    </Link>
                    <span className="badge badge-primary badge-pill">3</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <Link className="nav-link" to={{
                        pathname: "/workspace",
                        state: 'Decline Review'
                      }}
                      style={{padding: 0}}
                    >
                    Decline Reviews
                    </Link>
                    <span className="badge badge-primary badge-pill">2</span>
                  </li>

                </ul>
              </div>
            </div>


            {/* Community  */}
            <div className="col-lg-4">
              <div className="bs-component">
                <ul className="list-group">
                  <p className="lead">Community</p>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Your badges
                    <span className="badge badge-primary badge-pill">14</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    New publishings
                    <span className="badge badge-primary badge-pill">6</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Top topics
                    <span className="badge badge-primary badge-pill">7</span>
                  </li>

                </ul>
              </div>
            </div>


            {/* News  */}
            <div className="col-lg-4">
              <div className="bs-component">
                <ul className="list-group">
                  <p className="lead">News</p>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    CNN
                    <span className="badge badge-primary badge-pill">5</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Business Day
                    <span className="badge badge-primary badge-pill">11</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Daily Maverick
                    <span className="badge badge-primary badge-pill">9</span>
                  </li>

                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>
    )
  }
}

export default Main;
