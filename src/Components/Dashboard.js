import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import Welcome from './Workspace/Welcome';
import Workspace from './Workspace/Workspace';
import moment from 'moment';

/*const workspaces = [
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
];*/

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
      task: null,
      worklists: [],
      workspaces: null,
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
    let services = this.getWorkspaces(clientservices);
    //console.log('workspaces: ', workspaces);

    services.forEach(async service => {
      let workspace = service.workspace;
      let type = this.getType(clientservices, service);
      let workzones = this.getWorkzones();
      let worklists = [];
      await this.mysqlLayer.Get(`/${type}/${service}/list_all/${client}`
      ).then(async records => {
        worklists = await this.getWorklists(workzones, records);
        let workspaces = [];
        workspaces.push({
          workspace: workspace,
          worklists: worklists
        });

        //console.log('workspaces: ', workspaces);

        this.setState({
          tasks: ['list_all', 'list_today'],
          type: type,
          //records: records,
          workspaces: workspaces
        });
      });
      //console.log('worklists: ', worklists);


    });

    //this.setState({ loading: false });
  }

  getWorkspaces(clientservices) {
    let workspaces = [];
    clientservices.forEach(service => {
      workspaces.push({
        workspace: service.service
      });
    });
    return workspaces;
  }

  getType(clientservices, workspace) {
    let type = '';
    clientservices.forEach(service => {
      if (service.service === workspace.workspace) type = service.type;
    });
    return type;
  }

  getWorkzones() {
    return [
      {
        worklist: 'Queues',
        task: 'list_all'
      },
      {
        worklist: 'Today',
        task: 'list_today'
      }
    ];
  }

  getWorklists(workzones, records) {
    let worklists = [];
    workzones.forEach(async workzone => {
      //console.log('workzone: ', workzone);
      let items = await this.getItems(workzone.task, records);

      if (items) {
        worklists.push({
          worklist: workzone.worklist,
          items: items
        });
      }

      this.setState({
        worklists: worklists
      });
    });
    return worklists;
  }

  async getItems(task, records) {
    //console.log('task, records: ', task, records);
    let items = [];
    let user = 'eugener@sabco.za.com';
    let recordStatuses = this.getStatusLists(records);

    recordStatuses.forEach(recordStatus => {
      let count = 0;
      records.forEach(record => {
        let tags = [];
        //if (record.tags === undefined) console.log('undefined');
        if (record.tags !== undefined) tags = record.tags;

        switch (task) {
          case 'list_all':
            if (record.currentStatus === recordStatus) {
              ++count;
              tags.push(task);
            }
            break;
          case 'list_today':
          //console.log('today: ', moment(new Date() - 86400000).format('YYYY-MM-DD'), moment(record.nextVisitDateTime).format('YYYY-MM-DD'));
            if (record.currentStatus === recordStatus
                && record.currentAssignment === user
                && moment(record.nextVisitDateTime).format('YYYY-MM-DD') > (moment(new Date() - 86400000)).format('YYYY-MM-DD')) {
              ++count;
              tags.push(task);
              //console.log('list_today id: ', record.id);
            }
            break;
          default:
            console.log('task switch default - there must be a problem');
        }

        record.tags = tags;

      });
      items.push({
        item: recordStatus,
        count: count
      });

      //console.log('about to setState: ', records);
      this.setState({ records: records });
      //console.log('items: ', task, items);
    });


    return items;
  }

  /*async oldishgetItems(task, workspace, type, client) {
    //console.log('getItems task: ', task);
    let items = [];

    switch (task) {
      case 'list_all':
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`
        ).then(records => {
          if (records) {
            //console.log('pre-tagging: ', records.tags);
            let recordStatuses = this.getStatusLists(records);

            // prepare [items]
            recordStatuses.forEach(recordStatus => {
              let count = 0;
              records.forEach(record => {
                if (record.tags !== undefined) {
                  //console.log('list_all true: ', record);
                  let tags = record.tags;
                  //console.log('tags: ', tags);
                } else {
                  let tags = [];
                  record.tags = tags;
                }
                if (record.currentStatus === recordStatus) {
                  ++count;
                  record.tags.push(task);
                  //console.log('list_all tagged record.tags: ', record.tags);
                }
              });

              items.push({
                item: recordStatus,
                count: count
              });

              this.setState({
                records: records,
                task: task
              });
            });
          } else {
            console.log('Problem with getItems list_all');
          }
        });
        break;
      case 'list_today':
        //console.log('list_today');
        let user = 'eugener@sabco.za.com';//sessionStorage.getItem('cwsUser');
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}/workzone/${user}`
        ).then(records => {
          if (records) {
            console.log('records: ', records);
            let recordStatuses = this.getStatusLists(records);

            // prepare [items]
            recordStatuses.forEach(recordStatus => {
              let count = 0;
              records.forEach(record => {
                //console.log('record: ', record);
                if (record.tags !== undefined) {
                  console.log('list_today true: ', record.tags);
                  let tags = record.tags;
                } else {
                  //console.log('list_today false: ', record.tags);
                  let tags = [];
                  record.tags = tags;
                  //console.log('list_today false: ', record.tags);
                }
                if (record.currentStatus === recordStatus) {
                  ++count;
                  record.tags.push(task);
                  //console.log('list_today tagged record.tags: ', record.tags);
                }
              });

              items.push({
                item: recordStatus,
                count: count
              });

              this.setState({
                records: records,
                task: task
              });
            });
          } else {
            console.log('Problem with getItems list_today');
          }
        });
        break;
      default:
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`
        ).then(records => {
          if (records) {
            let statuses = this.getStatusLists(records);

            // prepare [items]
            statuses.forEach(status => {
              let count = 0;
              records.forEach(record => {
                if (record.currentStatus === status) ++count;
              });

              items.push({
                item: status,
                count: count
              });
              this.setState({ records: records });
            });
          } else {
            console.log('Problem with getItems default');
          }
        });
        break;
    }


    return items;
  }

  async oldgetItems(task, workspace, type, client) {
    //console.log('getItems task: ', task);
    let items = [];

    switch (task) {
      case 'list_all':
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`
        ).then(records => {
          if (records) {
            let statuses = this.getStatusLists(records);

            // prepare [items]
            statuses.forEach(status => {
              let count = 0;
              records.forEach(record => {
                if (record.currentStatus === status) {
                  ++count;
                  record.task = task;
                  console.log('tasked record: ', record);
                }
              });

              items.push({
                item: status,
                count: count
              });

              this.setState({
                records: records,
                task: task
              });
            });
          } else {
            console.log('Problem with getItems list_all');
          }
        });
        break;
      case 'list_today':
        //console.log('list_today');
        let user = 'eugener@sabco.za.com';//sessionStorage.getItem('cwsUser');
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}/workzone/${user}`
        ).then(records => {
          if (records) {
            console.log('records: ', records);
            let statuses = this.getStatusLists(records);

            // prepare [items]
            statuses.forEach(status => {
              let count = 0;
              records.forEach(record => {
                if (record.currentStatus === status) {
                  ++count;
                  //record.task
                }
              });

              items.push({
                item: status,
                count: count
              });

              this.setState({
                records: records,
                task: task
              });
            });
          } else {
            console.log('Problem with getItems list_today');
          }
        });
        break;
      default:
        await this.mysqlLayer.Get(`/${type}/${workspace}/${task}/${client}`
        ).then(records => {
          if (records) {
            let statuses = this.getStatusLists(records);

            // prepare [items]
            statuses.forEach(status => {
              let count = 0;
              records.forEach(record => {
                if (record.currentStatus === status) {
                  ++count;
                  //record.task
                }
              });

              items.push({
                item: status,
                count: count
              });
              this.setState({ records: records });
            });
          } else {
            console.log('Problem with getItems default');
          }
        });
        break;
    }


    return items;
  }
*/
  getStatusLists(records) {
    let list = [];
    records.forEach(record => {
      list.push(record.currentStatus);
    });

    // filter list for distinct statuseses
    let completeWorklist = list.filter(this.onlyUnique);

    return completeWorklist;
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

    //if (this.state.loading) {
    if (!this.state.workspaces) {
      return (
        <div>Loading...</div>
      );
    } else {
      //console.log('const workspaces: ', this.state.workspaces);
      //console.log('const workspaces: ', workspaces);
      const workspace = this.state.workspaces.map((workspace, idx) =>
      //const workspace = workspaces.map((workspace, idx) =>
        <div
          key={idx}
          className="card border-light mb-3"
          style={{
            padding: "20px",
            boxShadow: "0 10px 10px -5px",//"0px 0px 0px 0px #3D3735",
            border: "2px solid #3D3735",
            marginTop: "10px"
          }}
        >
          {/*console.log('render workspace: ', workspace)*/}
          <Workspace
            key={idx}
            records={this.state.records}
            workspaces={workspace}
            tasks={this.state.tasks}
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
