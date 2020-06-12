import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Applications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const applications = await this.mysqlLayer.Get('/applications');
    this.setState({ applications: applications })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/community/new-application">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Process a credit application</div>
              <div className="card-body">
                <h4 className="card-title">+ New Application</h4>
                <p className="card-text">Card text to come</p>
              </div>
            </div>
          </Link>

          {this.state.applications === null && <p>Loading applications...</p>}
          {
            this.state.applications && this.state.applications.map(application => (
              <div key={application.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/workspace/applications/${application.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">TAT {new Date() - application.createdDate}</div>
                    <div className="card-body">
                      <h4 className="card-title">{application.firstName} {application.surname}</h4>
                      <p className="card-text">card text to come ...</p>
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

export default Applications;
