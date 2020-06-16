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

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputMobile">Mobile</label>
                    <input
                      disabled={true}
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={application[0].mobile}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email address</label>
                    <input
                      disabled={true}
                      type="email"
                      name="email"
                      className="form-control"
                      value={application[0].email}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress1">Address Line 1</label>
                    <input
                      disabled={true}
                      type="text"
                      name="address1"
                      className="form-control"
                      value={application[0].address1}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress2">Address Line 2</label>
                    <input
                      disabled={true}
                      type="text"
                      name="address2"
                      className="form-control"
                      value={application[0].address2}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress3">Address Line 3</label>
                    <input
                      disabled={true}
                      type="text"
                      name="address3"
                      className="form-control"
                      value={application[0].address3}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress4">Address Line 4</label>
                    <input
                      disabled={true}
                      type="text"
                      name="address4"
                      className="form-control"
                      value={application[0].address4}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputAddress5">Address Line 5</label>
                    <input
                      disabled={true}
                      type="text"
                      name="address5"
                      className="form-control"
                      value={application[0].address5}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputresidencyDuration">Time at Address</label>
                    <input
                      disabled={true}
                      type="text"
                      name="residencyDuration"
                      className="form-control"
                      value={application[0].residencyDuration}
                    />
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmployer">Employer</label>
                    <input
                      disabled={true}
                      type="text"
                      name="employer"
                      className="form-control"
                      value={application[0].employer}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmploymentDuration">Time at Employer</label>
                    <input
                      disabled={true}
                      type="text"
                      name="employmentDuration"
                      className="form-control"
                      value={application[0].employmentDuration}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputBankCode">Bank Code</label>
                    <input
                      disabled={true}
                      type="text"
                      name="bankCode"
                      className="form-control"
                      value={application[0].bankCode}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputBankAcc">Bank Account</label>
                    <input
                      disabled={true}
                      type="text"
                      name="bankAccount"
                      className="form-control"
                      value={application[0].bankAccount}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputGrossIncome">Gross Income</label>
                    <input
                      disabled={true}
                      type="number"
                      name="grossIncome"
                      className="form-control"
                      value={application[0].grossIncome}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputExpenses">Expenses</label>
                    <input
                      disabled={true}
                      type="number"
                      name="expenses"
                      className="form-control"
                      value={application[0].expenses}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputBureauScore">Bureau Score</label>
                    <input
                      disabled={true}
                      type="number"
                      name="bureauScore"
                      className="form-control"
                      value={application[0].bureauScore}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    {/* This space left blank intentionally */}
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
