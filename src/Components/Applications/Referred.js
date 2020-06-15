import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Referred extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    await this.setState({ applications: this.props.location.state });
  }

  render() {
    //const tat = Math.abs(new Date() - new Date(this.state.application.createdDate));
    //console.log('tat: ', tat);
    return (
      <div className="container">
        <div className="row">

          {this.state.applications === null && <p>Loading applications...</p>}

          {
            this.state.applications && this.state.applications.map(application => (
              <div key={application.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/workspace/applications/${application.id}`}>
                  <div className="card text-white bg-success mb-3">
                    {console.log('application.createdDate: ', typeof new Date(application.createdDate))}
                      {console.log('Date: ', typeof new Date())}
                    <div className="card-header">TAT {}</div>
                    <div className="card-body">
                      <h4 className="card-title">{application.firstName} {application.surname}</h4>
                      <p className="card-text">{application.result} with ${application.limit}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Referred;
