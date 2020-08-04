import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import NumberFormat from 'react-number-format';

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: sessionStorage.getItem('cwsClient'),
      type: null,
      workspace: null,
      recordId: null,
      collection: null,
      disabled: false,
      caseNotes: null,
      user: sessionStorage.getItem('cwsUser'),
      changesMade: false,
      ptpDate: null,
      ptpAmount: 0,
      nextVisitDate: null,
      pendReason: '---',
      resolution: '---'
    }

    this.mysqlLayer = new MysqlLayer();
    this.handleChange = this.handleChange.bind(this);
    this.pendRecord = this.pendRecord.bind(this);
    this.closeRecord = this.closeRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);

  }

  async componentDidMount() {
    //let record = [];
    console.log('this.props.location: ', this.props.location);
    console.log('this.props.location.state !== undefined: ', this.props.location.state === undefined);
    // check if there are any props or send to the dashboard again
    if (this.props.location.state === undefined) {
      this.notify('error', 'The record was not found. Returning to the dashboard.', false);
      //alert('Buggered');
    } else if (this.props.location.state !== undefined) {
      // initial setting of state - need this in case someone tries to pull a record not found in the db
      const type = this.props.location.state.type;
      const workspace = this.props.location.state.workspace;
      const recordId = this.props.location.state.caseId;
      await this.setState({
        recordId: recordId,
        type: type,
        workspace: workspace
      });

      const clientId = this.state.clientId;

      let record = null;
      await this.mysqlLayer.Get(`/${type}/${workspace}/read_item/${clientId}/${recordId}`)
        .then(response => {
          console.log('Collection response: ', response);
          if (response) record = response;
        }
      );

      // Getting all the config for dropdown lists, etc
      let resolutions = await this.mysqlLayer.Get(`/admin/resolutions/list_all`);
      let pends = await this.mysqlLayer.Get(`/admin/pendreasons/list_all`);
      let transactionTypes = await this.mysqlLayer.Get(`/admin/transactiontypes/list_all`);
      //console.log('this.props.location.pathname: ', this.props.location.pathname);
      //console.log('record: ', record);
      //console.log('resolutions: ', resolutions);

      //console.log('pends: ', pends);
      await this.setState({
        collection: record,
        caseNotes: record.caseNotes,
        pendReasons: pends,
        resolutions: resolutions,
        transactionTypes: transactionTypes
      });

      // lock the record so no other agent accidentally opens it
      const dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const update = {
        currentStatus: 'Locked',
        lockedDatetime: dateTime
      };
      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].f_caseNumber}`, update);
      //console.log('collection: ', this.state.collection);
    } else {
      this.notify('error', 'The record was not found. Returning to the dashboard.', false);
      setTimeout(() => this.props.history.push('/dashboard'), 3000);
    }
  }

  notify(type, message, autoClose) {
    switch (type) {
      case 'info':
        toast.info(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'success':
        toast.success(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1
        });
        break;
      case 'warn':
        toast.warn(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'error':
        toast.error(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
      case 'default':
        toast(message, {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1
        });
        break;
      default:
        toast('No type selected', {
          position: "top-center",
          autoClose: autoClose,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        break;
    }

  }

  async handleChange(e) {
    const value = e.target.value;
    console.log('value: ', value);
    const name = [e.target.name];
    console.log('[e.target.name]: ', name);
    await this.setState({
      [e.target.name]: value,
      changesMade: true
    });
    //console.log('this.state after change: ', this.state);
  }

  async cancel() {
    let timer = 0;
    if (this.state.changesMade) {
      this.notify('warn', 'All changes have been lost', false);
      timer = 3000;
    }

    // unlock the record and release it to the pool
    const update = {
      currentStatus: 'Open'
    };
    await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].f_caseNumber}`, update);

    setTimeout(() => this.props.history.push({
      pathname: '/workzone/collections',
      state: {
        recordStatus: 'Open',
        clientId: this.state.clientId,
        type: this.state.type,
        workspace: this.state.workspace
      }
    }), timer);
  }

  async pendRecord() {
    const notes = this.state.caseNotes;

    // checking all the mandatory fields are populated
    let problems = [];
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (this.state.nextVisitDate === null) problems.push('Please provide a Next Visit Date');
    if (this.state.pendReason === '---') problems.push('Please select a Pend Reason');
    if (this.state.ptpDate && this.state.ptpAmount === 0) problems.push('Please provide a PTP Amount');
    if (!this.state.ptpDate && this.state.ptpAmount !== 0) problems.push('Please provide a PTP Date');

    if (notes && notes.length > 10 && this.state.nextVisitDate !== null && this.state.pendReason !== '---') {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].caseNotes ? this.state.collection[0].caseNotes + `\n\r` : '';

      let newNote = oldNotes + `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} - ${this.state.user}\nPend reason: ${this.state.pendReason}\nNotes: ${this.state.caseNotes}`;

      let caseUpdate = {
        caseNotes: newNote,
        currentStatus: 'Pended',
        pendReason: this.state.pendReason,
        updatedBy: this.state.user, // must add actual username
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeUpdate = '';
      if (!this.state.ptpDate) {
        outcomeUpdate = {
          nextVisitDate: moment(this.state.nextVisitDate).format('YYYY-MM-DD')
        };
      } else {
        outcomeUpdate = {
          ptpDate: this.state.ptpDate,
          ptpAmount: this.state.ptpAmount,
          nextVisitDate: moment(this.state.nextVisitDate).format('YYYY-MM-DD')
        };
      }

      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].f_caseNumber}`, caseUpdate);

      await this.mysqlLayer.Put(`/${this.state.type}/outcomes/update_item/${this.state.clientId}/${this.state.collection[0].id}`, outcomeUpdate);
      this.props.history.push({
        pathname: '/workzone/collections',
        state: {
          recordStatus: 'Pended',
          clientId: this.state.clientId,
          type: this.state.type,
          workspace: this.state.workspace
        }
      });
    } else {
      problems.forEach(problem => this.notify('error', problem, true));
    }
  }

  async updateRecord() {
    const notes = this.state.caseNotes;
    console.log('Updating...');

    // checking all the mandatory fields are populated
    let problems = [];
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (this.state.ptpDate && this.state.ptpAmount === 0) problems.push('Please provide a PTP Amount');
    if (!this.state.ptpDate && this.state.ptpAmount !== 0) problems.push('Please provide a PTP Date');
    //if (this.state.ptpAmount === 0) problems.push('Please select a PTP Amount');

    if (notes && notes.length > 10) {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].caseNotes ? this.state.collection[0].caseNotes + `\n\r` : '';

      let newNote = oldNotes + `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} - ${this.state.user}\nPTP Date: ${this.state.ptpDate}  PTP Amount: ${this.state.ptpAmount}\nNotes: ${this.state.caseNotes}`;
      let caseUpdate = {
        caseNotes: newNote,
        currentStatus: 'Open',
        updatedBy: this.state.user, // must add actual username
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeUpdate = null;
      if (!this.state.ptpDate && this.state.nextVisitDate) {
        outcomeUpdate = {
          nextVisitDate: moment(this.state.nextVisitDate).format('YYYY-MM-DD')
        };
      } else if (this.state.ptpDate && this.state.nextVisitDate) {
        outcomeUpdate = {
          ptpDate: this.state.ptpDate,
          ptpAmount: this.state.ptpAmount,
          nextVisitDate: moment(this.state.nextVisitDate).format('YYYY-MM-DD')
        };
      } else if (this.state.ptpDate && !this.state.nextVisitDate) {
        outcomeUpdate = {
          ptpDate: this.state.ptpDate,
          ptpAmount: this.state.ptpAmount
        };
      }

      let casePut = await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].f_caseNumber}`, caseUpdate);

      let outcomePut = null;
      if (outcomeUpdate) outcomePut = await this.mysqlLayer.Put(`/${this.state.type}/outcomes/update_item/${this.state.clientId}/${this.state.collection[0].id}`, outcomeUpdate);

      console.log('casePut: ', casePut);
      console.log('outcomePut: ', outcomePut);

      this.props.history.push({
        pathname: '/workzone/collections',
        state: {
          recordStatus: 'Open',
          clientId: this.state.clientId,
          type: this.state.type,
          workspace: this.state.workspace
        }
      });
    } else {
      problems.forEach(problem => this.notify('error', problem, true));
    }
  }

  async closeRecord() {
    const notes = this.state.caseNotes;

    // checking all the mandatory fields are populated
    let problems = [];
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (this.state.resolution === '---') problems.push('Please provide a resolution');
    if (this.state.ptpDate && this.state.ptpAmount === 0) problems.push('Please provide a PTP Amount');
    if (!this.state.ptpDate && this.state.ptpAmount !== 0) problems.push('Please provide a PTP Date');

    if (notes && notes.length > 10 && this.state.resolution !== "---") {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].caseNotes ? this.state.collection[0].caseNotes + `\n\r` : '';

      let newNote = oldNotes + `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} - ${this.state.user}\nResolution: ${this.state.resolution}\nNotes: ${this.state.caseNotes}`;
      let caseUpdate = {
        caseNotes: newNote,
        currentStatus: 'Closed',
        updatedBy: this.state.user, // must add actual username
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeUpdate = '';
      if (!this.state.ptpDate) {
        outcomeUpdate = {
          closedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          closedBy: this.state.user,
          resolution: this.state.resolution
        };
      } else {
        outcomeUpdate = {
          ptpDate: this.state.ptpDate,
          ptpAmount: this.state.ptpAmount,
          closedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          closedBy: this.state.user,
          resolution: this.state.resolution
        };
      }

      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].f_caseNumber}`, caseUpdate);

      await this.mysqlLayer.Put(`/${this.state.type}/outcomes/update_item/${this.state.clientId}/${this.state.collection[0].id}`, outcomeUpdate);
      this.props.history.push({
        pathname: '/workzone/collections',
        state: {
          recordStatus: 'Open',
          clientId: this.state.clientId,
          type: this.state.type,
          workspace: this.state.workspace
        }
      });
    } else {
      problems.forEach(problem => this.notify('error', problem, true));
    }
  }

  render() {
    const collection = this.state.collection;
    if (collection === null && this.props.location.state !== undefined) return <p>Loading...</p>;
    if (this.props.location.state === undefined) return <p>Record not found. Please return to the <Link to={"/dashboard"}>dashboard</Link></p>;

    const paymentDueDate = this.state.collection[0].paymentDueDate ?
      moment(collection[0].paymentDueDate).format('YYYY-MM-DD') :
      '';

    const debitOrderDate = this.state.collection[0].debitOrderDate ?
      moment(collection[0].debitOrderDate).format('YYYY-MM-DD') :
      '';

    const lastPaymentDate = this.state.collection[0].lastPaymentDate ?
      moment(collection[0].lastPaymentDate).format('YYYY-MM-DD') :
      '';

    const lastPTPDate = this.state.collection[0].lastPTPDate ?
      moment(collection[0].lastPTPDate).format('YYYY-MM-DD') :
      '';

    const nextVisitDate = this.state.collection[0].nextVisitDate ?
      moment(collection[0].nextVisitDate).format('YYYY-MM-DD') :
      '';

    const nextVisitTime = this.state.collection[0].nextVisitTime ?
      moment(collection[0].nextVisitTime).format('HH:mm:ss') :
      '';

    const outcomesNotes = this.state.collection.map(collection => {
      return (
        collection.outcomeNotes + '\n\r'
      );
    });

    const outcomes = this.state.collection.map(collection => {
      return (
        collection.outcome + '\n\r'
      );
    });

    const resolutionList = [<option key="0" value="---">Resolution</option>];
    //console.log('resolutionList before: ', resolutionList);
    resolutionList.push(this.state.resolutions.map(resolution =>
      <option key={resolution.id} value={resolution.shortCode}>{resolution.resolution}</option>
    ));

    const pendList = [<option key="0" value="---">Pend Reason</option>];
    //console.log('pendList before: ', pendList);
    pendList.push(this.state.pendReasons.map(pend =>
      <option key={pend.id} value={pend.shortCode}>{pend.pendreason}</option>
    ));

    const transactionTypeList = [<option key="0" value="---">Transaction Type</option>];
    //console.log('pendList before: ', pendList);
    transactionTypeList.push(this.state.transactionTypes.map(type =>
      <option key={type.id} value={type.shortCode}>{type.transactiontype}</option>
    ));


    /*<option value="unable">Unable to pay</option>
    <option value="already">Customer already paid</option>
    <option value="refuses">Customer refuses to pay</option>*/
    //console.log('resolutionList after: ', resolutionList);
    //console.log('pendList after: ', pendList);

    return (

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Case Number {collection[0].caseNumber}</div>
              <div className="card-body text-left">

              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="accountNotes">Account Number {collection[0].accountNumber} - Notes</label>
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
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="caseNotes">Case Notes</label>
                    <textarea
                      disabled={true}
                      rows="3"
                      name="caseNotes"
                      className="form-control"
                      value={this.state.collection[0].caseNotes || ''}
                    />
                  </div>
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-8">
                  <div className="form-group">
                    <label htmlFor="CompanyName">Company Name</label>
                    <input
                      disabled={true}
                      type="text"
                      name="companyName"
                      className="form-control"
                      value={collection[0].companyName || ''}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="RegNumber">Reg Number</label>
                    <input
                      disabled={true}
                      type="text"
                      name="regNumber"
                      className="form-control"
                      value={collection[0].regNumber || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="cipcStatus">CIPC Status</label>
                    <input
                      disabled={this.state.disabled}
                      type="text"
                      name="cipcStatus"
                      className="form-control"
                      onChange={(e) => {this.handleChange(e)}}
                      value={collection[0].cipcStatus || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">

                  </div>
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="debtorAge">Debtor Age</label>
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
                    <label htmlFor="creditLimit">Credit Limit</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="creditLimit"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].creditLimit.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="totalBalance">Total Balance</label>
                    <NumberFormat
                      displayType={'input'}
                      name="totalBalance"
                      className="form-control"
                      disabled={true}
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].totalBalance.toFixed(2) || 0}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="amountDue">Amount Due</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="amountDue"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].amountDue.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="currentBalance">Current Balance</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="currentBalance"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].currentBalance.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="accountStatus">Account Status</label>
                    <input
                      disabled={this.state.disabled}
                      type="text"
                      name="accountStatus"
                      className="form-control"
                      onChange={(e) => {this.handleChange(e)}}
                      value={collection[0].accountStatus || ''}
                    />
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days30">30 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days30"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days30.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days60">60 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days60"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days60.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days90">90 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days90"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days90.toFixed(2) || 0}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days120">120 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days120"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days120.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days150">150 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days150"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days150.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days180">180 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days180"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days180.toFixed(2) || 0}
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group">
                    <label htmlFor="days180Over">+180 Days</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="days180Over"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].days180Over.toFixed(2) || 0}
                    />
                  </div>
                </div>
              </div>

              <br /><br />

              <div className="row">
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="paymentDueDate">Payment Due Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="paymentDueDate"
                      className="form-control"
                      value={paymentDueDate}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="debitOrderDate">Debit Order Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="debitOrderDate"
                      className="form-control"
                      value={debitOrderDate}
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
                    <label htmlFor="lastPaymentDate">Last Payment Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="lastPaymentDate"
                      className="form-control"
                      value={lastPaymentDate}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="lastPaymentAmount">Last Payment Amount</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      name="lastPaymentAmount"
                      value={collection[0].lastPaymentAmount.toFixed(2) || 0}
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
                    <label htmlFor="ptpDate">Last PTP Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="lastPTPDate"
                      className="form-control"
                      value={lastPTPDate}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="ptpAmount">Last PTP Amount</label>
                    <NumberFormat
                      disabled={true}
                      displayType={'input'}
                      name="lastPTPAmount"
                      className="form-control"
                      thousandSeparator={true}
                      prefix={'R '}
                      value={collection[0].lastPTPAmount.toFixed(2) || 0}
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
                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="nextVisitDate">Next Visit Date</label>
                    <input
                      disabled={true}
                      type="text"
                      name="nextVisitDate"
                      className="form-control"
                      value={nextVisitDate}
                    />
                  </div>
                </div>

                <div className="col-2">
                  <div className="form-group">
                    <label htmlFor="nextVisitTime">Next Visit Time</label>
                    <input
                      disabled={true}
                      type="text"
                      name="nextVisitTime"
                      className="form-control"
                      value={nextVisitTime}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="repName">Representative Name</label>
                    <input
                      disabled={true}
                      type="text"
                      name="representativeName"
                      className="form-control"
                      value={collection[0].representativeName || ''}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="representativeNumber">Representative Number</label>
                    <input
                      disabled={true}
                      type="text"
                      name="representativeNumber"
                      className="form-control"
                      value={collection[0].representativeNumber || ''}
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

        <div className="col-12">
          <div className="form-group">
            {/* This space left blank intentionally */}
          </div>
        </div>

{/* --------------------------------------------- Outcome History section ------------------------------------------------------- */}
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">Outcome History</div>
              <div className="card-body text-left">

                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="outcomes">Outcomes</label>
                      <textarea
                        disabled={true}
                        rows="10"
                        name="outcomes"
                        className="form-control"
                        value={outcomes}
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="outcomesNotes">Outcome Notes</label>
                      <textarea
                        disabled={true}
                        rows="10"
                        name="outcomesNotes"
                        className="form-control"
                        value={outcomesNotes}
                      />
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

{/* --------------------------------------------- New activity section ------------------------------------------------------- */}
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Case Activity</div>
              <div className="card-body text-left">

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="transactionType">Transaction Type</label>
                      <select className="custom-select"
                        required
                        name="transactionType"
                        onChange={this.handleChange}
                      >
                      {transactionTypeList}
                      </select>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="numberCalled">Number Called</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="numberCalled"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.numberCalled || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="contactPerson">Person Contacted</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="contactPerson"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.contactPerson || ''}
                      />
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="emailUsed">Email Used</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="emailUsed"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.emailUsed || ''}
                      />
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="form-group">
                      <label htmlFor="nextSteps">Next Steps</label>
                      <input
                        disabled={this.state.disabled}
                        type="text"
                        name="nextSteps"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.nextSteps || ''}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="ptpDate">PTP Date</label>
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
                      <label htmlFor="ptpAmount">PTP Amount</label>
                      <NumberFormat
                        displayType={'input'}
                        className="form-control"
                        thousandSeparator={true}
                        disabled={false}
                        name="ptpAmount"
                        onChange={(e) => {this.handleChange(e)}}
                        value={this.state.ptpAmount || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleResolution">Resolution</label>
                      <select className="custom-select"
                        required
                        name="resolution"
                        onChange={this.handleChange}
                      >
                      {resolutionList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="nextVisitDate">Next Visit Date</label>
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

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="nextVisitTime">Next Visit Time</label>
                      <input
                        disabled={false}
                        type="time"
                        name="nextVisitTime"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.nextVisitTime || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="examplePendReason">Pend Reason</label>
                      <select className="custom-select"
                        required
                        name="pendReason"
                        onChange={this.handleChange}
                      >
                      {pendList}
                      </select>
                    </div>
                  </div>

                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="outcome">Outcome</label>
                      <textarea
                        disabled={this.state.disabled}
                        type="text"
                        rows="3"
                        name="outcome"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.outcome || ''}
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
                      <label htmlFor="outcomeNotes">Outcome Notes</label>
                      <textarea
                        disabled={this.state.disabled}
                        type="text"
                        rows="3"
                        name="outcomeNotes"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        placeholder="Remember to provide clear notes"
                      />
                    </div>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.pendRecord()}}
                      style={{ margin: "5px" }}
                    >
                      Save and Pend
                    </button>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.closeRecord()}}
                      style={{ margin: "5px" }}
                    >
                      Close
                    </button>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.updateRecord()}}
                      style={{ margin: "5px" }}
                    >
                      Update
                    </button>

                    <button
                      disabled={this.state.disabled}
                      className="btn btn-primary"
                      onClick={() => {this.cancel()}}
                      style={{ margin: "5px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />

      </div>
    )
  }
}

export default Collection;
