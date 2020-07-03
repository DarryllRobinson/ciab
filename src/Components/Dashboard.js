import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';

/*const application = {
  workspace: 'applications',
  worklists: [
      {
        worklist: 'Queues',
        items: [
          {
            item: 'Referred',
            count: 129
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
  workspace: 'collections',
  worklists: [
    {
      worklist: 'Queues',
      items: [
        {
          item: 'Current',
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

const worklistsNames = [
  'Queues',
  'Community',
  'News'
];*/

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,  // passed in from login - to be created still
      user: null,
      client: null,
      loading: true,
      role: 'god',  // passed in from login - to be created still
      records: null,
      service: null,
      worklists: [],
      workspaces: []
    }

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  async componentDidMount() {
    console.log('Dashboard props: ', this.props);

    //this.props.checkLoginStatus();
    // get user fields from table
    const user = await this.mysqlLayer.Get(`/admin/users/${this.state.userId}`);
    //console.log('Dashboard user: ', user);

    // get client from user who logged in
    const client = await this.mysqlLayer.Get(`/admin/clients/${user[0].f_clientId}`);
    //console.log('Dashboard client: ', client);

    // has client paid? - still thinking about this one...
    if (client[0].hasPaid === 0) {
      this.props.history.push(`/admin/arrears`);
    } else {
      // what services are turned on?
      const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${user[0].f_clientId}`);

      clientservices.forEach(async service => {
        // Ensuring the state.worklists are empty
        await this.setState({ worklists: [] });

        let workspace = service.service
        //console.log('Got the workspace: ', workspace);

        let records = await this.mysqlLayer.Get(`/workspace/${service.service}`);
        //console.log('records: ', records);
        //await this.setState({ records: records });

        let statusArr = [];
        records.forEach(record => {
          //console.log('currentStatus: ', record.currentStatus);
          statusArr.push(record.currentStatus);
        });
        //console.log('statusArr: ', statusArr);
        let worklists = statusArr.filter(this.onlyUnique);
        //console.log('Got the worklists: ', worklists);

        let items = [];
        worklists.forEach(async worklist => {
          let count = 0;
          records.forEach(record => {
            if (record.currentStatus === worklist) {
              ++count;
            }
          });
          //console.log('worklist: ', worklist);
          //console.log('record: ', record);

          //console.log('count: ', count);
          items.push({
            item: worklist,
            count: count
          });
          //console.log('items: ', items);

          let worklists = [];
          worklists.push({
            worklist: 'Queues',
            items: items
          });

          //console.log('worklists: ', worklists);
          //await this.setState({ worklists: [...this.state.worklists, ...worklists ] }); //another array
          await this.setState({ worklists: worklists });
          console.log('this.state.worklists: ', this.state.worklists);
        });

        let workspaces = [];
        workspaces.push({
          workspace: workspace,
          worklists: this.state.worklists
        });

        console.log('workspaces: ', workspaces);

        // Push into State
        await this.setState({
          //workspaces: workspaces
          workspaces: [...this.state.workspaces, ...workspaces ]
        });

        console.log('state.workspaces: ', this.state.workspaces);

      });

      // Should be good to render now
      this.setState({ loading: false });
    }
  }

  componentDidUpdate() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      this.props.history.push('/');
    }
  }


  onlyUnique(value, index, self) {
    /*console.log('value: ', value);
    console.log('index: ', index);
    console.log('self: ', self);*/
    return self.indexOf(value) === index;
  }

  render() {

    //let workspace = '';

    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else {

      const workspace = this.state.workspaces.map((workspace, idx) =>
        <div key={idx} className="card border-primary mb-3" style={{padding: "20px"}}>
          <Workspace key={idx} workspaces={workspace} user={this.state.user} />
        </div>
      );

      return (
        <div className="container">
          <div className="cols-12">
            <Welcome user={this.state.user}/>
            {workspace}
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
