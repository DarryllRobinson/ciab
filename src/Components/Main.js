import React, { Component } from 'react';
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

  const application = {
    workspace: 'Applications',
    worklists: [
        {
          worklist: 'Queues',
          items: [
            {
              item: 'Referred',
              count: 12
            },
            {
              item: 'Pended',
              count: 3
            },
            {
              item: 'Decline Reviews',
              count: 2
            }
          ]
        },
        {
          worklist: 'Community',
          items: [
            {
              item: 'Your badges',
              count: 14
            },
            {
              item: 'New publishings',
              count: 6
            },
            {
              item: 'Top topics',
              count: 7
            }
          ]
        },
        {
          worklist: 'News',
          items: [
            {
              item: 'CNN',
              count: 5
            },
            {
              item: 'Business Day',
              count: 11
            },
            {
              item: 'Daily Maverick',
              count: 9
            }
          ]
        }
    ]
  };

  const collection = {
    workspace: 'Collections',
    worklists: [
      {
        worklist: 'Queues',
        items: [
          {
            item: 'Status 1',
            count: 12
          },
          {
            item: 'Status 2',
            count: 3
          },
          {
            item: 'Status 3',
            count: 2
          }
        ]
      },
      {
        worklist: 'Community',
        items: [
          {
            item: 'Community 1',
            count: 12
          },
          {
            item: 'Community 2',
            count: 3
          },
          {
            item: 'Community 3',
            count: 2
          }
        ]
      },
      {
        worklist: 'News',
        items: [
          {
            item: 'News 1',
            count: 12
          },
          {
            item: 'News 2',
            count: 3
          },
          {
            item: 'News 3',
            count: 2
          }
        ]
      }
    ]
  }

  const workspaces = [
    application,
    collection
  ];

  const workspace = workspaces.map((workspace, idx) =>
    <div key={idx} className="card border-primary mb-3" style={{padding: "20px"}}>
      <Workspace key={idx} workspaces={workspace} />
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
