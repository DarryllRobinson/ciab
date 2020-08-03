import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';

const workspaces = [
  {
    workspace: 'collections',
    worklists: [
      {
        worklist: 'Queues',
        items: [
          {
            item: 'Open',
            count: 3
          },
          {
            item: 'Pended',
            count: 5
          },
          {
            item: 'Closed',
            count: 7
          }
        ]
      },
      {
        worklist: 'Work for today',
        items: [
          {
            item: 'Call back',
            count: 11
          },
          {
            item: 'Admin',
            count: 13
          }
        ]
      }
    ]
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tasks: [
        'list_all',
        'list_today'
      ],
      records: null,
      worklists: [],
      workspaces: []
    }

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  async componentDidMount() {
    //console.log('Dashboard props: ', this.props);
    //console.log('starting state: ', this.state);

    await this.setUser();
    const clientId = this.state.user[0].clientId;

    //console.log('clientId: ', clientId);
    await this.getClientServices(clientId);
    const type = this.state.type;
    const workspace = this.state.workspace;
    const tasks = this.state.tasks;
    //console.log(type, workspace, tasks);

    let worklists = await this.setWorklists(type, workspace, tasks, clientId);
    //console.log('worklists: ', worklists);
    await this.setState({ worklists: worklists });
    let workspaces = [];
    workspaces.push({
      workspace: workspace,
      worklists: this.state.worklists
    });
    //console.log('workspaces: ', workspaces);

    await this.setState({
      loading: false,
      workspaces: [...this.state.workspaces, ...workspaces ]
      //workspaces: workspaces
    });
    //console.log('final state: ', this.state);
    //console.log('final workspaces: ', this.state.workspaces);
  }

  async setUser() {
    let data = {
      firstName: sessionStorage.getItem('cwsFirstName'),
      surname: sessionStorage.getItem('cwsSurname'),
      email: sessionStorage.getItem('cwsUser'),
      role: sessionStorage.getItem('cwsRole'),
      type: sessionStorage.getItem('cwsType'),
      storeId: sessionStorage.getItem('cwsStoreId'),
      clientId: sessionStorage.getItem('cwsClient')
    };

    let user = [];
    user.push(data);
    await this.setState({ user: user });
  }

  async getClientServices(clientId) {
    let clientServices = await this.mysqlLayer.Get(`/admin/clientservices/${clientId}`);
    await this.setState({
      type: clientServices[0].type,
      workspace: clientServices[0].service,
    });
  }

  async setWorklists(type, workspace, tasks, client) {
    //console.log('setting worklists with: ', type, workspace, tasks, client);
    let worklist = [];
    // Taking the each task and asking the next function to return the item title and count
    tasks.forEach(async task => {
      //console.log('task: ', task);
      let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
      //console.log('task and count: ', task, records.length);

      let statusArr = [];
      records.forEach(record => {
        //console.log('currentStatus: ', record.currentStatus);
        statusArr.push(record.currentStatus);
      });
      await this.setState({ records: records });
      let worklistTitles = statusArr.filter(this.onlyUnique);
      //console.log('worklistTitles: ', worklistTitles);
      // sending to setItems to get a split of count by worklistTitle
      let items = await this.setItems(task, worklistTitles, records);
      //console.log('items: ', items);
      switch (task) {
        case 'list_all':
          task = 'Queues';
          break;
        case 'list_today':
          task = 'Work for today';
          break;
        default:
          task = 'Task not found';
          break;
      }
      worklist.push({
        worklist: task,
        items: items
      });
    });
    //console.log('worklist: ', worklist);
    return worklist;
  }

  async setItems(task, worklists, records) {
    //console.log('setItems task worklists, record count: ', task, worklists, records.length);
    let items = [];
    // Loop through worklists to count records that match
    worklists.forEach(worklist => {
      //console.log('worklist: ', worklist);
      // Reset the counter
      let count = 0;
      records.forEach(record => {
        if (record.currentStatus === worklist) {
          //console.log('Got one');
          count++;
        }
      });
      //console.log('worklist count: ', worklist, count);
      items.push({
        item: worklist,
        count: count
      });
    });
    //console.log('items: ', items);
    return items;
  }

  async xxxsetWorklists(type, workspace, tasks, client) {
    console.log('setWorklist: ', tasks);

    let lists = [];
    tasks.forEach(async task => {
      console.log('task: ', task);

      let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
      let statusArr = [];
      records.forEach(record => {
        //console.log('currentStatus: ', record.currentStatus);
        statusArr.push(record.currentStatus);
      });
      await this.setState({ records: records });
      let worklistTitles = statusArr.filter(this.onlyUnique);
      //console.log('unique worklist: ', worklist);

      // Need to ensure unapproved record statuses aren't shown
      let worklists = [];
      if (worklistTitles.length > 0) worklists = this.filterWorklists(workspace, worklistTitles);
      //console.log('unique approved worklists: ', worklists);

      let items = await this.setItems(worklists, records);
      lists.push(items);
      //console.log('items: ', items);

      /*worklists.forEach(async worklist => {
        console.log('forEach worklist: ', worklist);
        //let list = [{worklist: task}];
        let items = await this.setItems(worklist, records);
        //console.log('list: ', list);
        console.log('items: ', items);
        lists.push({
          worklist: task,
          items: items
        });
      });*/
      //console.log('lists: ', lists);
    });
    return lists;
  }
/*

      let items = [];
      worklists.forEach(async worklist => {
        let count = 0;
        records.forEach(record => {
          if (record.currentStatus === worklist) {
            ++count;
          }
        });

        items.push({
          item: worklist,
          count: count
        });
        console.log('items: ', items);

        switch (task) {
          case 'list_all':
            task = 'Queues';
            break;
          case 'list_today':
            task = 'Work for today';
            break;
          default:
            task = 'Task not found';
            break;
        }

        let worklists = [];
        worklists.push({
          worklist: task,
          items: items
        })
      });
    });

  }*/

  async xxxsetItems(tasks, records) {
    //console.log('setItems tasks: ', tasks);
    let worklist = [];

    tasks.forEach(task => {
      let items = [];
      let count = 0;
      records.forEach(record => {
        if (record.currentStatus === task) {
          count++;
        }
      });
      //console.log('task count: ', task, count);
      items.push({
        worklist: task,
        count: count
      });
      //console.log('setItems items: ', items);
      worklist.push(items);
    });

    return worklist;
  }

  componentDidUpdate() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      this.props.history.push('/');
    }
  }

  filterWorklists(workspace, lists) {
    //console.log('lists: ', lists);
    let role = sessionStorage.getItem('cwsRole');
    //console.log('role: ', role);
    let finalList = [];
    let recordStatuses = [];

    switch (workspace) {
      case 'applications':
        switch (role) {
          case 'agent':
            recordStatuses = ['Approved', 'Declined', 'Cancelled', 'Pended - Agent', 'DeclineReview - Agent', 'Referred'];

            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          case 'store':
            recordStatuses = ['Approved', 'Declined', 'Cancelled', 'Pended - Store', 'DeclineReview - Store'];

            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          case 'god':
            recordStatuses = ['Approved', 'Declined', 'Cancelled', 'Pended - Agent', 'DeclineReview - Agent', 'Pended - Store', 'DeclineReview - Store', 'Referred'];

            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          default:
            finalList = ['No record statuses for this user'];
            return finalList;
        }

      case 'collections':
        switch (role) {
          case 'agent':
            recordStatuses = ['Open', 'Closed', 'Pended'];

            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          case 'store':
            recordStatuses = ['Open', 'Closed', 'Pended'];
            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          case 'god':
            recordStatuses = ['Open', 'Closed', 'Pended', 'Locked'];
            lists.forEach(list => {
              //console.log('list: ', list);
              //console.log(recordStatuses.find(recordStatus => list === recordStatus));
              if (recordStatuses.find(recordStatus => list === recordStatus)) finalList.push(list);
            });
            //console.log('finalList: ', finalList);
            return finalList;
          default:
            finalList = ['No record statuses for this user'];
            return finalList;
        }

      default:
        finalList = ['No record statuses for this user'];
        return finalList;
    }

  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  render() {

    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else {

      const workspace = this.state.workspaces.map((workspace, idx) =>
      //const workspace = workspaces.map((workspace, idx) =>
        <div key={idx} className="card border-light mb-3" style={{padding: "20px"}}>
          {/*console.log('const workspace: ', workspace)*/}
          <Workspace
            key={idx}
            records={this.state.records}
            workspaces={workspace}
            type={this.state.type}
            user={this.state.user}
          />
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
