import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      client: null,
      loading: true,
      role: null,
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
    // get user fields from session
    let data = {
      firstName: sessionStorage.getItem('cwsFirstName'),
      surname: sessionStorage.getItem('cwsSurname'),
      email: sessionStorage.getItem('cwsUser'),
      role: sessionStorage.getItem('cwsRole'),
      type: sessionStorage.getItem('cwsType'),
      storeId: sessionStorage.getItem('cwsStoreId'),
      clientId: sessionStorage.getItem('cwsClient')
    };

    //if (Object.keys(this.props.user).length === 0) {
      let user = [];
      user.push(data);
      await this.setState({ user: user });
    /*} else {
      let user = this.props.user;
      await this.setState({ user: user });
    }*/
    //const user = data ? data : ;//await this.mysqlLayer.Get(`/admin/users/${this.state.userId}`);
    //console.log('Dashboard user: ', this.state.user);

    // get client from user who logged in
    const client = data.clientId ? data.clientId : this.props.user[0].client;//await this.mysqlLayer.Get(`/admin/clients/${user[0].f_clientId}`);
    //console.log('Dashboard client: ', client);
    const type = sessionStorage.getItem('cwsType');

    // has client paid? - still thinking about this one...
    /*if (client[0].hasPaid === 0) {
      this.props.history.push(`/admin/arrears`);
    } else {*/
      // what services are turned on?
      //console.log('getting clientservices');
      const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${client}`);

      clientservices.forEach(async service => {
        // Ensuring the state.worklists are empty
        await this.setState({ worklists: [] });

        let workspace = service.service
        let type = service.type;
        //console.log('Got the workspace: ', workspace);
        //console.log('Got the type: ', type);
        let task = 'list_all';
        //console.log(`url: /${type}/${workspace}/${task}/${client}`);

        let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
        //console.log('records: ', records);
        //console.log('workspace: ', workspace);
        //await this.setState({ records: records });

        let statusArr = [];
        records.forEach(record => {
          //console.log('currentStatus: ', record.currentStatus);
          statusArr.push(record.currentStatus);
        });
        //console.log('statusArr: ', statusArr);
        let completeWorklist = statusArr.filter(this.onlyUnique);
        //console.log('Got the completeWorklist: ', completeWorklist);
        let worklists = [];
        if (completeWorklist.length > 0) worklists = this.filterWorklists(workspace, completeWorklist);

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
          });

          //console.log('worklists: ', worklists);
          //await this.setState({ worklists: [...this.state.worklists, ...worklists ] }); //another array
          await this.setState({ worklists: worklists });
          //console.log('this.state.worklists: ', this.state.worklists);
        });

        let workspaces = [];
        workspaces.push({
          workspace: workspace,
          worklists: this.state.worklists
        });

        //console.log('workspaces: ', workspaces);

        // Push into State
        await this.setState({
          client: client,
          //user: user,
          records: records,
          type: type,
          workspaces: [...this.state.workspaces, ...workspaces ]
        });

      });

      // Should be good to render now
      this.setState({ loading: false });
    //}   this is for the hasPaid check
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
            recordStatuses = ['Open', 'Closed', 'Pended'];
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
    /*console.log('value: ', value);
    console.log('index: ', index);
    console.log('self: ', self);*/
    return self.indexOf(value) === index;
  }

  render() {

    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    } else {

      const workspace = this.state.workspaces.map((workspace, idx) =>
        <div key={idx} className="card border-primary mb-3" style={{padding: "20px"}}>
          {/*console.log('workspace: ', workspace)*/}
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
