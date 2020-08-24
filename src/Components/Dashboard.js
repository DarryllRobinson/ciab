import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';
import moment from 'moment';

const workspaces = [
  {
    workspace: 'collections',
    worklists: [
      {
        worklist: 'Queues',
        items: [
          {
            item: 'Closed',
            count: 3
          },
          {
            item: 'Open',
            count: 5,
          },
          {
            item: 'Pended',
            count: 7
          }
        ]
      },
      {
        worklist: 'Today',
        items: [
          {
            item: 'Pended',
            count: 11
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
      user: null,
      client: null,
      items: null,
      loading: true,
      role: null,
      records: null,
      service: null,
      worklists: [],
      workspaces: [],
      workzones: []
    }

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  async testcomponentDidMount() {
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
    this.setState({ user: user });
    const client = data.clientId;

    // start with extracting the services from the db
    const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${client}`);
    //console.log('clientservices: ', clientservices);

    let workzones = [
      {
        worklist: 'Queues',
        task: 'list_all'
      },
      {
        worklist: 'Today',
        task: 'list_today'
      }
    ];

    // loop through services to populate worklists
    let loopCount = 0;
    clientservices.forEach(service => {
      console.log('line 1', loopCount);
      let workspace = service.service;
      console.log('line 2', loopCount);
      let type = service.type;
      console.log('line 3', loopCount);

      //let workspaces = [];
      let worklists = [];
      console.log('line 4', loopCount);

      // loop through the workzones
      workzones.forEach(async workzone => {
      console.log('line 5', loopCount);
        console.log('workzone: ', workzone);
        console.log('line 6', loopCount);
        let task = workzone.task;
        console.log('line 7', loopCount);
        let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
        console.log('line 8', loopCount);
        //console.log('records: ', records);

        let statusArr = [];
        console.log('line 9', loopCount);
        records.forEach(record => {
        console.log('line 10', loopCount);
          //console.log('currentStatus: ', record.currentStatus);
          statusArr.push(record.currentStatus);
          console.log('line 11', loopCount);
        });
        console.log('line 12', loopCount);

        let completeWorklist = statusArr.filter(this.onlyUnique);
        console.log('line 13', loopCount);

        let statusList = [];
        console.log('line 14', loopCount);
        if (completeWorklist.length > 0) statusList = this.filterWorklists(workspace, completeWorklist);
        console.log('line 15', loopCount);

        let items = [];
        console.log('line 16', loopCount);
        statusList.forEach(element => {
        console.log('line 17', loopCount);
          console.log('element: ', element);
          console.log('line 18', loopCount);
          let count = 0;
          console.log('line 19', loopCount);
          records.forEach(record => {
          console.log('line 20', loopCount);
            if (record.currentStatus === element) {
            console.log('line 21', loopCount);
              ++count;
              console.log('line 22', loopCount);
            }
            console.log('line 23', loopCount);
          });
          console.log('line 24', loopCount);
          items.push({
            item: element,
            count: count
          });
          console.log('line 25', loopCount);
        }); // end of worklist loop *******************************
        console.log('line 26', loopCount);

        worklists.push({
          worklist: workzone.worklist,
          items: items
        });
        console.log('line 27', loopCount);

        ++loopCount;
        console.log('line 28', loopCount);
        console.log('loopCount: ', loopCount);
        console.log('line 29', loopCount);
        console.log('worklists: ', worklists);
        console.log('line 30', loopCount);

      }); // end of workzone loop *******************************
      console.log('line 31', loopCount);
    }); // end of workspace loop *******************************
    console.log('line 32', loopCount);

    // Should be good to render now
    //if (this.state.worklists.length > 1)
    this.setState({ loading: false });
    console.log('line 33', loopCount);
    //this.forceUpate();

  }

  async componentDidMount() {
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
    this.setState({ user: user });
    const client = data.clientId;

    // start with extracting the services from the db
    const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${client}`);
    //console.log('clientservices: ', clientservices);

    let workzones = [
      {
        worklist: 'Queues',
        task: 'list_all'
      },
      {
        worklist: 'Today',
        task: 'list_today'
      }
    ];

    // loop through services to populate worklists
    let loopCount = 0;
    clientservices.forEach( service => {
      let workspace = service.service;
      let type = service.type;

      let workspaces = [];
      let worklists = [];

      // loop through the workzones
      workzones.forEach(async workzone => {
        //console.log('workzone: ', workzone);
        let task = workzone.task;
        //let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
        console.log('about to fetch records', moment(new Date()).milliseconds())
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`)
          .then(records => {
            console.log('records: ', records, moment(new Date()).milliseconds())
            if (records) {
              //console.log('records: ', records);

              let statusArr = [];
              records.forEach( record => {
                //console.log('currentStatus: ', record.currentStatus);
                statusArr.push(record.currentStatus);
              });

              let completeWorklist = statusArr.filter(this.onlyUnique);

              let statusList = [];
              if (completeWorklist.length > 0) statusList = this.filterWorklists(workspace, completeWorklist);

              let items = [];
              statusList.forEach( element => {
                //console.log('element: ', element);
                let count = 0;
                records.forEach( record => {
                  if (record.currentStatus === element) {
                    ++count;
                  }
                });
                items.push({
                  item: element,
                  count: count
                });
                //console.log('items: ', items);
              }); // end of worklist loop *******************************

              worklists.push({
                worklist: workzone.worklist,
                items: items
              });
              //console.log('worklists: ', workzone, worklists, moment(new Date()).format('HH:mm:sss'));
              console.log('worklists: ', workzone, worklists, moment(new Date()).milliseconds());

              /*this.setState({
                records: records,
                type: type,
                worklists: [...this.state.worklists, ...worklists]
              });*/

              ++loopCount;
              console.log('loopCount: ', loopCount);

              //console.log('this.state.worklists: ', this.state.worklists, moment(new Date()).milliseconds());
              //let tempWorklists = this.state.worklists;
              //console.log('tempWorklists: ', tempWorklists, moment(new Date()).milliseconds());

              workspaces.push({
                workspace: workspace,
                worklists: worklists //tempWorklists
              });
              console.log('workspaces: ', workspaces);
            } else {
              console.log('Problem extracting records');
            }
          });



      }); // end of workzone loop *******************************


      //console.log('2 workspaces: ', workspaces);
      //console.log('this.state.workspaces: ', this.state.workspaces, moment(new Date()).milliseconds());

      this.setState({
        //loading: false,
        //workspaces: [...this.state.workspaces, ...workspaces]
        workspaces: workspaces
        //workspaces: workspacesConst
      });
      //console.log('this.state.workspaces: ', this.state.workspaces, moment(new Date()).milliseconds());

    }); // end of workspace loop *******************************

    // Should be good to render now
    //if (this.state.worklists.length > 1)
    this.setState({ loading: false });
    //this.forceUpate();

  }

  async xxxcomponentDidMount() {
    //console.log('Dashboard props: ', this.props);

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
      this.setState({ user: user });
    /*} else {
      let user = this.props.user;
      this.setState({ user: user });
    }*/
    //const user = data ? data : ;//await this.mysqlLayer.Get(`/admin/users/${this.state.userId}`);
    //console.log('Dashboard user: ', this.state.user);

    // get client from user who logged in
    const client = data.clientId ? data.clientId : this.props.user[0].client;//await this.mysqlLayer.Get(`/admin/clients/${user[0].f_clientId}`);
    //console.log('Dashboard client: ', client);
    //const type = sessionStorage.getItem('cwsType');

    // has client paid? - still thinking about this one...
    /*if (client[0].hasPaid === 0) {
      this.props.history.push(`/admin/arrears`);
    } else {*/
      // what services are turned on?
      //console.log('getting clientservices');
      const clientservices = await this.mysqlLayer.Get(`/admin/clientservices/${client}`);

      clientservices.forEach(async service => {
        // Ensuring the state.worklists are empty
        this.setState({ worklists: [] });

        let workspace = service.service
        let type = service.type;
        //console.log('Got the workspace: ', workspace);
        //console.log('Got the type: ', type);
        let task = 'list_all';
        //console.log(`url: /${type}/${workspace}/${task}/${client}`);

        let records = await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`);
        //console.log('records: ', records);
        //console.log('workspace: ', workspace);
        //this.setState({ records: records });

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
        worklists.forEach( worklist => {
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
            worklist: 'Today',
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
          //this.setState({ worklists: [...this.state.worklists, ...worklists ] }); //another array
          this.setState({ worklists: worklists });
          //console.log('this.state.worklists: ', this.state.worklists);
        });

        let workspaces = [];
        workspaces.push({
          workspace: workspace,
          worklists: this.state.worklists
        });

        //console.log('workspaces: ', workspaces);

        // Push into State
        this.setState({
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

      //const workspace = this.state.workspaces.map((workspace, idx) =>
      const workspace = workspaces.map((workspace, idx) =>
        <div key={idx} className="card border-light mb-3" style={{padding: "20px"}}>
          {console.log('render workspace: ', workspace.worklists, moment(new Date()).milliseconds())}
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
