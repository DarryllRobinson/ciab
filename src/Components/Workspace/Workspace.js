import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import Worklist from './Worklist';
//import Community from './Community';
//import News from './News';

const worklists = [
  'Queues',
  'Community',
  'News'
]

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const service = this.props.service;
    const records = await this.mysqlLayer.Get(`/workspace/${service}`);
    await this.setState({ records: records });
  }

  render() {
    const records = this.state.records;
    const worklist = worklists.map((worklist, idx) =>

        <div key={idx+'worklist'} className="col-lg-4">
          <div className="bs-component">
            <ul className="list-group">
              <p className="lead">{worklist}</p>
              <Worklist worklist={worklist} records={records}/>
            </ul>
          </div>
        </div>

    );

    return (
      <>
      {
        records ?
        (
          <div className="row">
            {worklist}
          </div>
        ) :
        (
          <div>Loading</div>
        )
      }
      </>
    )
  }

}

export default Workspace;
