import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import Welcome from './Workspace/Welcome';
import Worklist from './Workspace/Worklist';
import Item from './Workspace/Item';

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

  const items = [
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
  ];
    return (
      <div className="container">
        <div className="cols-12">

          <Welcome />

          {/* Workspace - Applications  */}
          <div className="card border-primary mb-3" style={{padding: "20px"}}>
            <p className="lead">Workspace - Applications</p>
            <div className="row">


              {/* Queues  */}
              <Worklist list="Queues" items={items}/>


              {/* Community  */}
              <div className="col-lg-4">
                <div className="bs-component">
                  <ul className="list-group">
                    <p className="lead">Community</p>

                      <Item item='Your badges' count='14'/>
                      <Item item='New publishings' count='6'/>
                      <Item item='Top topics' count='7'/>

                  </ul>
                </div>
              </div>


              {/* News  */}
              <div className="col-lg-4">
                <div className="bs-component">
                  <ul className="list-group">
                    <p className="lead">News</p>

                      <Item item='CNN' count='5'/>
                      <Item item='Business Day' count='11'/>
                      <Item item='Daily Maverick' count='9'/>

                  </ul>
                </div>
              </div>
            </div>
          </div>


          {/* Workspace - Collections  */}
          <div className="card border-primary mb-3" style={{padding: "20px"}}>
            <p className="lead">Workspace - Collections</p>
            <div className="row">

              {/* Queues  */}
              <div className="col-lg-4">
                <div className="bs-component">
                  <ul className="list-group">
                    <p className="lead">Queues</p>

                      <Item item='Referred' count='12'/>
                      <Item item='Pended' count='3'/>
                      <Item item='Decline Reviews' count='2'/>

                  </ul>
                </div>
              </div>


              {/* Community  */}
              <div className="col-lg-4">
                <div className="bs-component">
                  <ul className="list-group">
                    <p className="lead">Community</p>

                      <Item item='Your badges' count='14'/>
                      <Item item='New publishings' count='6'/>
                      <Item item='Top topics' count='7'/>

                  </ul>
                </div>
              </div>


              {/* News  */}
              <div className="col-lg-4">
                <div className="bs-component">
                  <ul className="list-group">
                    <p className="lead">News</p>

                      <Item item='CNN' count='5'/>
                      <Item item='Business Day' count='11'/>
                      <Item item='Daily Maverick' count='9'/>

                  </ul>
                </div>
              </div>
            </div>



          </div>
        </div>
      </div>
    )
  }
}

export default Main;
