import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';

class Applications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applications: null,
      approved: null,
      referred: null,
      declined: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const applications = await this.mysqlLayer.Get('/workspace/applications');
    await this.setState({ applications: applications });
    await this.queuePrep(applications);
  }

  queuePrep(apps) {
    let approved = [];
    let referred = [];
    let declined = [];

    apps.forEach(app => {
      switch (app.result) {
        case 'Approved': approved.push(app); break;
        case 'Referred': referred.push(app); break;
        case 'Declined': declined.push(app); break;
        default: ;
      }
    });

    this.setState({
      approved: approved,
      referred: referred,
      declined: declined
    });
  }

  queueCount(apps) {
    let approved = 0;
    let referred = 0;
    let declined = 0;

    apps.forEach(app => {
      switch (app.result) {
        case 'Approved': ++approved; break;
        case 'Referred': ++referred; break;
        case 'Declined': ++declined; break;
        default: ;
      }
      this.setState({
        approved: approved,
        referred: referred,
        declined: declined
      })
    })
  }

  render() {
    //const tat = Math.abs(new Date() - new Date(this.state.application.createdDate));
    //console.log('tat: ', tat);
    return (
      <div className="container">
        <div className="row">
          <Link to="/workspace/new-application">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Process a credit application</div>
              <div className="card-body">
                <h4 className="card-title">+ New Application</h4>
                <p className="card-text">Card text to come</p>
              </div>
            </div>
          </Link>
        </div>

        {this.state.applications === null && <p>Loading queues...</p>}
          {this.state.applications && this.state.approved && this.state.referred && this.state.declined && (
            <div className="row">
              <Link to={{
                pathname: "/workspace/applications/approved",
                state: this.state.approved
              }}>
                <div className="card text-white bg-secondary mb-3">
                  <div className="card-header">Approved Applications</div>
                  <div className="card-body">
                    <h4 className="card-title">{this.state.approved.length}</h4>
                  </div>
                </div>
              </Link>

              <Link to={{
                pathname: "/workspace/applications/referred",
                state: this.state.referred
              }}>
                <div className="card text-white bg-secondary mb-3">
                  <div className="card-header">Referred Applications</div>
                  <div className="card-body">
                    <h4 className="card-title">{this.state.referred.length}</h4>
                  </div>
                </div>
              </Link>

              <Link to={{
                pathname: "/workspace/applications/declined",
                state: this.state.declined
              }}>
                <div className="card text-white bg-secondary mb-3">
                  <div className="card-header">Declined Applications</div>
                  <div className="card-body">
                    <h4 className="card-title">{this.state.declined.length}</h4>
                  </div>
                </div>
              </Link>
            </div>
        )}
        </div>

    )
  }
}

export default Applications;
