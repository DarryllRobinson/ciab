import React, { Component } from 'react';
import {Link } from "react-router-dom";
import { MDBDataTable } from 'mdbreact';
import MysqlLayer from '../Utilities/MysqlLayer';
import moment from 'moment';

class CollectionsWorkspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordStatus: 'Open',
      columns: [
        {
          label: 'Record ID',
          field: 'recordId',
          sort: 'asc'
        },
        {
          label: 'Account Number',
          field: 'accountNumber',
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
        {
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
        },
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
      ],
      rows: []
    }

    this.mysqlLayer = new MysqlLayer();
    this.loadRecords = this.loadRecords.bind(this);
  }

  async componentDidMount() {
    await this.setState({ recordStatus: this.props.location.state });
    //console.log('recordStatus: ', this.state.recordStatus);
    this.loadRecords(this.state.recordStatus);
  }

  async loadRecords(status) {
    let records = await this.mysqlLayer.Get('/workspace/collections');
    let recordStatus = status;
    let rows = [];

    if (records) {
      records.forEach(record => {
        if (record.status === recordStatus) {
          let row = {
            recordId: record.id,
            accountNumber: record.accountNumber,
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
                pathname: `/workspace/collections/${record.id}`,
                state: {recordId: record.id}
              }}
              style={{padding: 0}}><button type="button" className="btn btn-secondary" size="sm">Open</button></Link>
          }
          rows.push(row);
        }
      });
    }

    this.setState({
      rows: rows,
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
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Pended")}>Load Pended Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Decline Review")}>Load Decline Review Applications</button>
        </div>
      )
      case 'Pended': return (
        <div>
          <h4>Pended Applications</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Referred")}>Load Referred Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Decline Review")}>Load Decline Review Applications</button>
        </div>
      )
      case 'Decline Review': return (
        <div>
          <h4>Decline Review Applications</h4>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Referred")}>Load Referred Applications</button>
          <button type="button" className="btn btn-secondary" onClick={() => this.loadRecords("Pended")}>Load Pended Applications</button>
        </div>
      )
      default: return (
        <div>
          <h4>Problem Loading Applications</h4>
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

export default CollectionsWorkspace;
