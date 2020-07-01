import React, {Component} from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collection: null,
      disabled: false,
      caseNotes: '',
      user: "Darryll",
      changesMade: false,
      ptpDate: null,
      ptpAmount: 0,
      nextVisitDate: null,
      resolution: ''
    }

    this.mysqlLayer = new MysqlLayer();
    this.handleChange = this.handleChange.bind(this);
    this.pendRecord = this.pendRecord.bind(this);
    //this.closeRecord = this.closeRecord.bind(this);
    //this.updateRecord = this.updateRecord.bind(this);

  }

  async componentDidMount() {
    let record = [];
    console.log('this.props.location.pathname: ', this.props.location.pathname);
    record = await this.mysqlLayer.Get(this.props.location.pathname);
    //console.log('this.props.location.pathname: ', this.props.location.pathname);
    console.log('record: ', record);
    await this.setState({
      collection: record,
      caseNotes: record.caseNotes
    });
    //console.log('collection: ', this.state.collection);
  }

  async handleChange(e) {
    const value = e.target.value;
    //console.log('value: ', value);
    //const name = [e.target.name];
    //console.log('[e.target.name]: ', name);
    await this.setState({
      [e.target.name]: value,
      changesMade: true
    });
    //console.log('this.state after change: ', this.state);
  }

  async pendRecord() {
    const notes = this.state.caseNotes;
    if (notes && notes.length > 10 && this.state.nextVisitDate !== null) {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].caseNotes ? this.state.collection[0].caseNotes + `\n\r` : '';

      let newNote = oldNotes + `${this.state.user} - ${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}: ${this.state.caseNotes}`;
      let caseUpdate = {
        caseNotes: newNote,
        currentStatus: 'Pended',
        updatedBy: this.state.user, // must add actual username
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeUpdate = {
        nextVisitDate: moment(this.state.nextVisitDate).format('YYYY-MM-DD')
      };

      await this.mysqlLayer.Put(`/workspace/cases/${this.state.collection[0].f_caseNumber}`, caseUpdate);
      await this.mysqlLayer.Put(`/workspace/outcomes/${this.state.collection[0].id}`, outcomeUpdate);
      this.props.history.push({
        pathname: '/workspace/collections',
        status: 'Arrears'
      });
    } else {
      alert('Please enter a note longer than 10 characters and provide a Next Visit Date');
    }
  }

  render() {
    const collection = this.state.collection;
    if (collection === null) return <p>Loading...</p>;

    return (

      <div className="container">
        <div className="row">{console.log('collection: ', collection)}
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Account Number {collection[0].accountNumber}</div>
              <div className="card-body text-left">

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="exampleInputaccountNotes">Account Notes</label>
                    <textarea
                      disabled={true}
                      rows="3"
                      name="accountNotes"
                      className="form-control"
                      value={this.state.collection[0].accountNotes || ''}
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputFirstName">First Name</label>
                    <input
                      disabled={true}
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={collection[0].firstName || ''}
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
                      value={collection[0].surname || ''}
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
                      value={collection[0].idNumber || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdebtorAge">Debtor Age</label>
                    <input
                      disabled={true}
                      type="number"
                      name="debtorAge"
                      className="form-control"
                      value={collection[0].debtorAge || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputcreditLimit">Credit Limit</label>
                    <input
                      disabled={true}
                      type="number"
                      name="creditLimit"
                      className="form-control"
                      value={collection[0].creditLimit || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputtotalBalance">Total Balance</label>
                    <input
                      disabled={true}
                      type="number"
                      name="totalBalance"
                      className="form-control"
                      value={collection[0].totalBalance || 0}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputamountDue">Amount Due</label>
                    <input
                      disabled={true}
                      type="number"
                      name="amountDue"
                      className="form-control"
                      value={collection[0].amountDue || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputcurrentBalance">Current Balance</label>
                    <input
                      disabled={true}
                      type="number"
                      name="currentBalance"
                      className="form-control"
                      value={collection[0].currentBalance || 0}
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
                    <label htmlFor="exampleInputdays30">30 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days30"
                      className="form-control"
                      value={collection[0].days30 || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdays60">60 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days60"
                      className="form-control"
                      value={collection[0].days60 || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdays90">90 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days90"
                      className="form-control"
                      value={collection[0].days90 || 0}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdays120">120 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days120"
                      className="form-control"
                      value={collection[0].days120 || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdays150">150 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days150"
                      className="form-control"
                      value={collection[0].days150 || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdays180">180 Days</label>
                    <input
                      disabled={true}
                      type="number"
                      name="days180"
                      className="form-control"
                      value={collection[0].days180 || 0}
                    />
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputpaymentDueDate">Payment Due Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="paymentDueDate"
                      className="form-control"
                      value={collection[0].paymentDueDate || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputdebitOrderDate">Debit Order Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="debitOrderDate"
                      className="form-control"
                      value={collection[0].debitOrderDate || ''}
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
                    <label htmlFor="exampleInputlastPaymentDate">Last Payment Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="lastPaymentDate"
                      className="form-control"
                      value={collection[0].lastPaymentDate || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputlastPaymentAmount">Last Payment Amount</label>
                    <input
                      disabled={true}
                      type="number"
                      name="lastPaymentAmount"
                      className="form-control"
                      value={collection[0].lastPaymentAmount || 0}
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
                    <label htmlFor="exampleInputlastPTPDate">Last PTP Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="lastPTPDate"
                      className="form-control"
                      value={collection[0].lastPTPDate || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="exampleInputlastPTPAmount">Last PTP Amount</label>
                    <input
                      disabled={true}
                      type="number"
                      name="lastPTPAmount"
                      className="form-control"
                      value={collection[0].lastPTPAmount || 0}
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
                    <label htmlFor="exampleInputnextVisitDate">Next Visit Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="nextVisitDate"
                      className="form-control"
                      value={collection[0].nextVisitDate || ''}
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

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              {/* This space left blank intentionally */}
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            {/* This space left blank intentionally */}
          </div>
        </div>


        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Case Activity</div>
              <div className="card-body text-left">

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputptpDate">PTP Date</label>
                      <input
                        disabled={false}
                        type="date"
                        name="ptpDate"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.ptpDate || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputptpAmount">PTP Amount</label>
                      <input
                        disabled={false}
                        type="number"
                        name="ptpAmount"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.ptpAmount || 0}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputnextVisitDate">Next Visit Date</label>
                      <input
                        disabled={false}
                        type="date"
                        name="nextVisitDate"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.nextVisitDate || ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <select className="custom-select"
                        required
                        name="resolution"
                        onChange={this.handleChange}
                      >
                        <option value="---">Resolution</option>
                        <option value="ptp">PTP created</option>
                        <option value="unable">Unable to pay</option>
                        <option value="already">Customer already paid</option>
                        <option value="refuses">Customer refuses to pay</option>
                      </select>
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


        <div className="row">
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                {/* This space left blank intentionally */}
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                {/* This space left blank intentionally */}
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Case Notes History</div>
              <div className="card-body text-left">

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputcaseNotes">Case Notes</label>
                      <textarea
                        disabled={true}
                        rows="10"
                        name="caseNotes"
                        className="form-control"
                        value={this.state.collection[0].caseNotes || ''}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              {/* This space left blank intentionally */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              {/* This space left blank intentionally */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Notes</div>
              <div className="card-body text-left">

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputAgentNotes">Case Notes</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="caseNotes"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        placeholder="Remember to provide clear notes"
                      />
                    </div>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.pendRecord()}}>
                      Save and Pend
                    </button>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.closeRecord()}}>
                      Close
                    </button>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.updateRecord()}}>
                      Update
                    </button>
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

export default Collection;
