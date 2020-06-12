import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';

class NewApplication extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      firstName: '',
      surname: '',
      idNumber: '',
      mobile: '',
      email: '',
      dob: null,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      bankCode: '',
      bankAccount: '',
      grossIncome: 0,
      expenses: 0,
      bureauScore: 0,
      createdBy: '',
      createdDate: null
    }

    this.mysqlLayer = new MysqlLayer();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ [e.target.name]: value });
  }

  async submit() {
    this.setState({ disabled: true });

    let xxxapplication = {
      firstName: this.state.firstName,
      surname: this.state.surname,
      idNumber: this.state.idNumber,
      mobile: this.state.mobile,
      email: this.state.email,
      dob: this.state.dob,
      address1: this.state.address1,
      address2: this.state.address2,
      address3: this.state.address3,
      address4: this.state.address4,
      address5: this.state.address5,
      bankCode: this.state.bankCode,
      bankAccount: this.state.bankAccount,
      grossIncome: this.state.grossIncome,
      expenses: this.state.expenses,
      bureauScore: this.state.bureauScore,
      createdBy: "Darryll", // must add actual username
      createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    let application = {
      firstName: "Peter",
      surname: "Parker",
      idNumber: "1234567890123",
      mobile: "01234",
      email: "peter@email.com",
      dob: "1990-09-18",
      address1: "45 Buckingham Place",
      address2: "",
      address3: "",
      address4: "Durban",
      address5: "2134",
      bankCode: "123456",
      bankAccount: "22233344",
      grossIncome: 10000,
      expenses: 2000,
      bureauScore: 650,
      createdBy: "Darryll", // must add actual username
      createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

    console.log('application: ', application);

    await this.mysqlLayer.Post('/applications', application);
    this.props.history.push('/workspace/applications');
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Your new application</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputFirstName">First Name</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="firstName"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Peter"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputsurname">Surname</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="surname"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Parker"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputIDNumber">ID Number</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="idNumber"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="1234567890123"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputMobile">Mobile</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="mobile"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="01234"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail">Email</label>
                  <input
                    disabled={this.state.disabled}
                    type="email"
                    name="email"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="peter@email.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputDOB">Date of birth</label>
                  <input
                    disabled={this.state.disabled}
                    type="date"
                    name="dob"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="01/06/1990"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress1">Address Line 1</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="address1"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Building 1"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress2">Address Line 2</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="address2"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="43 Street Lane"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress3">Address Line 3</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="address3"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="Suburb"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress4">Address 4</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="address4"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress5">Post Code</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="address5"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="2134"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBankCode">Bank Code</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="bankCode"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="123456"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBankAcc">Bank Account</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    name="bankCode"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder="444-555-66"
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Gross Income</label>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="grossIncome"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        data-np-checked="1"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label">Expenses</label>
                  <div className="form-group">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="expenses"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        data-np-checked="1"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputBureauScore">Bureau Score</label>
                  <input
                    disabled={this.state.disabled}
                    type="number"
                    name="bureauScore"
                    onChange={(e) => {this.handleChange(e)}}
                    className="form-control"
                    placeholder=""
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {this.submit()}}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(NewApplication);
