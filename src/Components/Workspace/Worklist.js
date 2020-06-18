import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
//import Item from './Item';

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

class Worklist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: '',
      records: null,
      statusList: []
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const worklist = this.props.worklist;
    console.log('Worklist props: ', this.props);

    switch (worklist) {
      case 'Queues':
        this.createQueue(queueItems);
        break;
      case 'Community':
        //this.createCommunity(communityItems);
        break;
      case 'News':
        //this.createNews(newsItems);
        break;
      default:
        break;
    }



    /*
    //console.log('Worklist props: ', this.props);
    const worklist = this.props.worklist;
    console.log('worklist: ', worklist);
    this.setState({ component: worklist });
    const records = this.props.records;
    //console.log('Worklist records: ', records);
    await this.setState({ records: records });

    switch (worklist) {
      case 'Queues':
        return (
          <li key={'queue'} className="list-group-item d-flex justify-content-between align-items-center">
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
        )
        break;
      default:

    }

    let status = [];
    records.forEach(record => {
      status.push(record.status);
    });

    const statusArr = status.filter(this.onlyUnique);
    console.log('statusArr: ', statusArr);
    await this.setState({ statusList: statusArr });*/
  }

  createQueue(statuses) {
    console.log('createQueue statuses: ', statuses);

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
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
        {item.status}
        <span className="badge badge-primary badge-pill">{item.count}</span>
      </li>
    );


    return (
      <div >
      {
        this.state.statusList ?
        (
          <div>
            {queue}
            {community}
          </div>
        ) :
        (
          <div>Loading</div>
        )
      }
      </div>
  )
}

}

export default Worklist;
