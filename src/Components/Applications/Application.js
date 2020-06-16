import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import SubmitComment from './SubmitComment';
import moment from 'moment';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      application: null,
    }

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    let record = [];
    record = await this.mysqlLayer.Get(this.props.location.pathname);
    await this.setState({ application: record });
    console.log('application: ', this.state.application);
  }

  render() {
    const application = this.state.application;
    if (application === null) return <p>Loading...</p>;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Application {application[0].id}</div>
              <div className="card-body text-left">

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputFirstName">First Name</label>
                    <input
                      disabled={true}
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={application[0].firstName}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputSurname">Surname</label>
                    <input
                      disabled={true}
                      type="text"
                      name="surname"
                      className="form-control"
                      value={application[0].surname}
                    />
                  </div>
                </div>



                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputIDNumber">ID Number</label>
                    <input
                      disabled={true}
                      type="text"
                      name="idNumber"
                      className="form-control"
                      value={application[0].idNumber}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputDOB">Date of Birth</label>
                    <input
                      disabled={true}
                      type="text"
                      name="dob"
                      className="form-control"
                      value={moment(application[0].dob).format('YYYY-MM-DD')}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputSex">Sex</label>
                    <input
                      disabled={true}
                      type="text"
                      name="sex"
                      className="form-control"
                      value={application[0].sex}
                    />
                  </div>
                </div>



                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputNumDependents">Number of Dependents</label>
                    <input
                      disabled={true}
                      type="text"
                      name="numDependents"
                      className="form-control"
                      value={application[0].numDependents}
                    />
                  </div>
                </div>
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Application;
