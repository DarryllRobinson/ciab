import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import Queues from './Queues';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null,
      statusList: []
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const service = this.props.service;
    console.log('service: ', service);
    let records = await this.mysqlLayer.Get(`/workspace/${service}`);

    let status = [];
    let count = 0;
    records.forEach(record => {
      ++count;
      status.push(record.status);
    });

    const statusArr = status.filter(this.onlyUnique);
    await this.setState({ statusList: statusArr, statusCount: count });
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  render() {
    const listQueues = this.state.statusList.map((item, idx) =>
      <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
        <Link className="nav-link" to={{
            pathname: "/workspace",
            state: {item}
          }}
          style={{padding: 0}}>
          {item}
        </Link>
        <span className="badge badge-primary badge-pill">{this.state.statusCount}</span>
      </li>
    );

    return (
      <>
        <div className="col-lg-4">
          <div className="bs-component">
            <ul className="list-group">
              <p className="lead">Queues</p>
                {listQueues}
            </ul>
          </div>
        </div>
      </>
  )
}

}

export default Workspace;
