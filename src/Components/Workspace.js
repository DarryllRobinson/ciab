import React, { Component } from 'react';
import {Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import MysqlLayer from '../Utilities/MysqlLayer';
import moment from 'moment';

class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordStatus: 'Referred',
      columns: [],
      rows: []
    }

    this.mysqlLayer = new MysqlLayer();
    this.loadRecords = this.loadRecords.bind(this);
  }

  async componentDidMount() {
    console.log('Actual Workspace props: ', this.props);

    // Figure out what workspace to extract
    const workspace = this.props.location.workspace ?
      this.props.location.workspace :
      this.getWorkspaceName(this.props.history.location.pathname);
    console.log('mounting workspace: ', workspace);

    // Determine which status to set, fallback to default if required
    let recordStatus = '';
    if (workspace === 'applications') {
      recordStatus = this.props.location.status ? this.props.location.status : 'Referred';
    } else if (workspace === 'collections') {
      recordStatus = this.props.location.status ? this.props.location.status : 'Current';
    }
    console.log('mounting recordStatus: ', recordStatus);

    await this.setState({
      recordStatus: recordStatus,
      workspace: workspace
    });

    console.log('recordStatus: ', this.state.recordStatus);
    this.loadRecords(this.state.recordStatus, workspace);
    //this.loadRecords(this.state.recordStatus);
  }

  getWorkspaceName(pathname) {
    console.log('pathname: ', pathname);
    const searchTerm = '/';
    const indexOfFirst = pathname.indexOf(searchTerm);
    const indexOfSecond = pathname.indexOf(searchTerm, (indexOfFirst + 1));
    const indexOfThird = pathname.indexOf(searchTerm, (indexOfSecond + 1));
    const indexOfFourth = pathname.indexOf(searchTerm, (indexOfThird + 1));
    const indexOfFifth = pathname.indexOf(searchTerm, (indexOfFourth + 1));
    const apiLength = pathname.length;

    console.log('indexOfFirst: ', indexOfFirst);
    console.log('indexOfSecond: ', indexOfSecond);
    console.log('indexOfThird: ', indexOfThird);
    console.log('indexOfFourth: ', indexOfFourth);
    console.log('indexOfFifth: ', indexOfFifth);
    console.log('apiLength: ', apiLength);

    // For routes with /api/{resource}/{table}/{appstatus}/:id pattern
    if (indexOfFifth < 0) console.log('5: ', pathname.substring(indexOfThird + 1, indexOfFourth));
    if (indexOfFifth < 0) return pathname.substring(indexOfThird + 1, indexOfFourth);
    // For routes with /api/{resource}/{table}/:id pattern
    if (indexOfFourth < 0) console.log('4: ', pathname.substring(indexOfThird + 1, apiLength));
    if (indexOfFourth < 0) return pathname.substring(indexOfThird + 1, apiLength);
    // For routes with /api/{table}/:id pattern
    if (indexOfThird < 0) console.log('3: ', pathname.substring(indexOfSecond + 1, apiLength));
    if (indexOfThird < 0) return pathname.substring(indexOfSecond + 1, apiLength);
    // For routes with /api/{table} pattern
    if (indexOfSecond < 0) console.log('2: ', pathname.substring(indexOfFirst, indexOfSecond + 1));
    if (indexOfSecond < 0) return pathname.substring(indexOfFirst, apiLength);
  }

  //async loadRecords(status, workspace) {
  async loadRecords(status, workspace) {
    console.log('loading records');
    //const status = this.state.recordStatus;
    //const workspace = this.state.workspace ? this.state.workspace : this.props.workspace;

    let records = await this.mysqlLayer.Get(`/workspace/${workspace}`);
    console.log('records: ', records);
    let recordStatus = status;
    let rows = [];
    let columns = [];

    if (records) {
      records.forEach(record => {
        if (record.status === recordStatus && workspace === 'applications') {
          console.log('records: applications');
          let row = {
            recordId: record.id,
            firstName: record.firstName,
            surname: record.surname,
            idNumber: record.idNumber,
            status: record.status,
            limit: record.limit,
            createdBy: record.createdBy,
            createdDate: moment(record.createdDate).format('YYYY-MM-DD HH:mm:ss'),
            //id: <button type="button" className="btn btn-secondary" name={record.id} size="sm" onClick={this.openRecord}>Open</button>
            id: <Link className="nav-link" to={{
                pathname: `/workspace/applications/${record.id}`,
                state: {recordId: record.id}
              }}
              style={{padding: 0}}><button type="button" className="btn btn-secondary" size="sm">Open</button></Link>
          }
          rows.push(row);

          columns = [
            {
              label: 'Record ID',
              field: 'recordId',
              sort: 'asc'
            },
            {
              label: 'First Name',
              field: 'firstName',
              sort: 'asc'
            },
            {
              label: 'Surname',
              field: 'surname',
              sort: 'asc'
            },
            {
              label: 'ID Number',
              field: 'idNumber',
              sort: 'asc'
            },
            {
              label: 'Status',
              field: 'status',
              sort: 'asc'
            },
            {
              label: 'Limit',
              field: 'limit',
              sort: 'asc'
            },
            {
              label: 'Agent',
              field: 'createdBy',
              sort: 'asc'
            },
            {
              label: 'Date Created',
              field: 'createdDate',
              sort: 'asc'
            },
            {
              label: 'Open',
              field: 'id',
              sort: 'asc'
            }
          ];
        } else if (record.status === recordStatus && workspace === 'collections') {
          console.log('records: collections');
          let row = {
            recordId: record.id,
            accountNumber: record.accountNumber,
            firstName: record.firstName,
            surname: record.surname,
            debtorAge: record.debtorAge,
            creditLimit: record.creditLimit,
            totalBalance: record.totalBalance,
            amountDue: record.amountDue,
            currentBalance: record.currentBalance,
            days30: record.days30,
            days60: record.days60,
            days90: record.days90,
            days120: record.days120,
            days150: record.days150,
            days180: record.days180,
            paymentDueDate: record.paymentDueDate,
            debitOrderDate: record.debitOrderDate,
            lastPaymentDate: record.lastPaymentDate,
            lastPaymentAmount: record.lastPaymentAmount,
            lastPTPDate: record.lastPTPDate,
            lastPTPAmount: record.lastPTPAmount,
            accountNotes: record.accountNotes,
            nextVisitDate: record.nextVisitDate,
            currentStatus: record.status,
            createdBy: record.createdBy,
            createdDate: moment(record.createdDate).format('YYYY-MM-DD HH:mm:ss'),
            //id: <button type="button" className="btn btn-secondary" name={record.id} size="sm" onClick={this.openRecord}>Open</button>
            id: <Link className="nav-link" to={{
                pathname: `/workspace/collections/${record.accountNumber}`,
                state: {accountNumber: record.accountNumber}
              }}
              style={{padding: 0}}><button type="button" className="btn btn-secondary" size="sm">Open</button></Link>
          }
          rows.push(row);
          columns = [
            {
              label: 'Account Number',
              field: 'accountNumber',
              sort: 'asc'
            },
            {
              label: 'First Name',
              field: 'firstName',
              sort: 'asc'
            },
            {
              label: 'Surname',
              field: 'surname',
              sort: 'asc'
            },
            {
              label: 'Debtor Age',
              field: 'debtorAge',
              sort: 'asc'
            },
            {
              label: 'Credit Limit',
              field: 'creditLimit',
              sort: 'asc'
            },
            {
              label: 'Total Balance',
              field: 'totalBalance',
              sort: 'asc'
            },
            {
              label: 'Amount Due',
              field: 'amountDue',
              sort: 'asc'
            },
            {
              label: 'Current Balance',
              field: 'currentBalance',
              sort: 'asc'
            },
            /*{
              label: 'Days 30',
              field: 'days30',
              sort: 'asc'
            },
            {
              label: 'Days 60',
              field: 'days60',
              sort: 'asc'
            },
            {
              label: 'Days 90',
              field: 'days90',
              sort: 'asc'
            },
            {
              label: 'Days 120',
              field: 'days120',
              sort: 'asc'
            },
            {
              label: 'Days 150',
              field: 'days150',
              sort: 'asc'
            },
            {
              label: 'Days 180',
              field: 'days180',
              sort: 'asc'
            },
            {
              label: 'Payment Due Date',
              field: 'paymentDueDate',
              sort: 'asc'
            },
            {
              label: 'Debit Order Date',
              field: 'debitOrderDate',
              sort: 'asc'
            },
            {
              label: 'Last Payment Date',
              field: 'lastPaymentDate',
              sort: 'asc'
            },
            {
              label: 'Last Payment Amount',
              field: 'lastPaymentAmount',
              sort: 'asc'
            },
            {
              label: 'Last PTP Date',
              field: 'lastPTPDate',
              sort: 'asc'
            },
            {
              label: 'Last PTP Amount',
              field: 'lastPTPAmount',
              sort: 'asc'
            },
            {
              label: 'Account Notes',
              field: 'accountNotes',
              sort: 'asc'
            },
            {
              label: 'Next Visit Date',
              field: 'nextVisitDate',
              sort: 'asc'
            },*/
            {
              label: 'Current Status',
              field: 'currentStatus',
              sort: 'asc'
            },
            {
              label: 'Agent',
              field: 'createdBy',
              sort: 'asc'
            },
            {
              label: 'Date Created',
              field: 'createdDate',
              sort: 'asc'
            },
            {
              label: 'Open',
              field: 'id',
              sort: 'asc'
            }
          ];
        }
      });
    }

    this.setState({
      rows: rows,
      columns: columns,
      recordStatus: status
    });
  }

  /*openRecord(event) {
    let recordId = event.target.name;
    history.push('/workspace/application', { recordId });
  }*/

  componentToLoad() {
    const status = this.state.recordStatus;
    switch (status) {
      case 'Referred': return (
        <div>
          <h4>Referred Applications</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Pended", this.state.workspace)}>Load Pended Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Decline Review", this.state.workspace)}>Load Decline Review Applications</button>
        </div>
      )
      case 'Pended': return (
        <div>
          <h4>Pended Applications</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Referred", this.state.workspace)}>Load Referred Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Decline Review", this.state.workspace)}>Load Decline Review Applications</button>
        </div>
      )
      case 'Decline Review': return (
        <div>
          <h4>Decline Review Applications</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Referred", this.state.workspace)}>Load Referred Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Pended", this.state.workspace)}>Load Pended Applications</button>
        </div>
      )
      case 'Current': return (
        <div>
          <h4>Current Accounts</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("In Arrears", this.state.workspace)}>Load Accounts In Arrears</button>
          {/*<button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Pended", this.state.workspace)}>Load Pended Applications</button>*/}
        </div>
      )
      default: return (
        <div>
          <h4>Problem Loading Records</h4>
        </div>
      )
    }
  }

  render() {
    let gridData = { columns: this.state.columns, rows: this.state.rows }
    return (
      <div>
        {this.componentToLoad()}

        <MDBDataTable
          striped
          bordered
          small
          data={gridData}
        />
      </div>
    )
  }
}

export default Workspace;
