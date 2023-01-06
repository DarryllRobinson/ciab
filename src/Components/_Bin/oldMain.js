import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../Utilities/MysqlLayer';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';

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
    const workspace = this.state.services.map((service, idx) =>
      <div key={idx+'service'}>
        <Workspace key={idx+'service'} service={service} />
      </div>
    );

    return (
      <div className="container">
        <div className="cols-12">
          <Welcome />
          {workspace}
        </div>
      </div>
    )
  }
}

export default Main;
