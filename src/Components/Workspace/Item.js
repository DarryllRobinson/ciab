import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

const queueItems = [
  {
    status: 'Referred',
    count: 5
  },
  {
    status: 'Pended',
    count: 3
  },
  {
    status: 'Decline Review',
    count: 2
  }
];

const communityItems = [
  {
    status: 'Your badges',
    count: 14
  },
  {
    status: 'New publishings',
    count: 6
  },
  {
    status: 'Top topics',
    count: 7
  }
];

const newsItems = [
  {
    status: 'CNN',
    count: 5
  },
  {
    status: 'Business Day',
    count: 11
  },
  {
    status: 'Daily Maverick',
    count: 9
  }
];

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    console.log('Item props: ', this.props);
    //let records = await this.mysqlLayer.Get(`/workspace/${service}`);
    const item = queueItems.map((item, idx) =>
      console.log('inside item: ', item.status)
    );
  }

  render() {
    const queue = queueItems.map((item, idx) =>

        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
          <Link className="nav-link" to={{
              pathname: "/workspace",
              state: item.status
            }}
            style={{padding: 0}}
          >
            {item.status}
          </Link>
          <span className="badge badge-primary badge-pill">{item.count}</span>
        </li>

    );

    const community = communityItems.map((item, idx) =>

        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
          <Link className="nav-link" to={{
              pathname: "/workspace",
              state: item.status
            }}
            style={{padding: 0}}
          >
            {item.status}
          </Link>
          <span className="badge badge-primary badge-pill">{item.count}</span>
        </li>

    );

    const news = newsItems.map((item, idx) =>

        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
          <Link className="nav-link" to={{
              pathname: "/workspace",
              state: item.status
            }}
            style={{padding: 0}}
          >
            {item.status}
          </Link>
          <span className="badge badge-primary badge-pill">{item.count}</span>
        </li>

    );

    return (
      <>
        {queue}
      </>
  )
}

}

export default Item;
