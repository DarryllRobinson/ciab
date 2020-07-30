import React, { Component } from 'react';
import { MDBBtn, MDBRow } from 'mdbreact';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { CSVLink } from "react-csv";
import _ from 'lodash';
import MysqlLayer from '../Utilities/MysqlLayer';

export default class Reports extends Component {

  reportData = [{
    'dummy': 'dummy'
  }];

  constructor(props) {
    super(props);
    this.state = {
      type: 'business',
      workspace: 'collections',
      clientId: 1
    };

    this.loadCollectionRecords = this.loadCollectionRecords.bind(this);
    this.setExportData = this.setExportData.bind(this);
    this.mysqlLayer = new MysqlLayer();

  }

  componentDidMount() {
    //console.log('state: ', this.state);
    this.loadCollectionRecords();
  }

  async loadCollectionRecords() {
    //console.log('loadCollectionRecords...');
    const type = this.state.type;
    const workspace = this.state.workspace;
    const clientId = this.state.clientId;

    this.reportData = await this.mysqlLayer.Get(`/${type}/${workspace}/list_all/${clientId}`);
    //console.log('this.reportData: ', this.reportData);
    this.processReportData();
    this.setState({ staticContext: this.state.staticContext });
  }

  processReportData() {
    //console.log('processReportData...');
    if (!this.reportData) this.reportData = [];

    _.forEach(this.reportData, function(obj) {
      if (obj.accountNotes) {
        _.set(obj, 'Account Notes', obj.accountNotes);
      }

      if (obj.accountNumber) {
        _.set(obj, 'Account Number', obj.accountNumber);
      }

      if (obj.accountRef) {
        _.set(obj, 'Account Reference', obj.accountRef);
      }

      if (obj.actionDate) {
        _.set(obj, 'Action Date', obj.actionDate);
      }

      if (obj.actionNotes) {
        _.set(obj, 'Action Notes', obj.actionNotes);
      }

      if (obj.address1) {
        _.set(obj, 'Address Line 1', obj.address1);
      }

      if (obj.address2) {
        _.set(obj, 'Address Line 2', obj.address2);
      }

      if (obj.address3) {
        _.set(obj, 'Address Line 3', obj.address3);
      }

      if (obj.address4) {
        _.set(obj, 'Address Line 4', obj.address4);
      }

      if (obj.address5) {
        _.set(obj, 'Address Line 5', obj.address5);
      }

      if (obj.amountDue) {
        _.set(obj, 'Amount Due', obj.amountDue);
      }

      if (obj.arg) {
        _.set(obj, 'Account Risk Grade', obj.arg);
      }

      if (obj.caseDate) {
        _.set(obj, 'Account Notes', obj.caseDate);
      }

      if (obj.caseNotes) {
        _.set(obj, 'Case Notes', obj.caseNotes);
      }

      if (obj.closedBy) {
        _.set(obj, 'Closed By', obj.closedBy);
      }

      if (obj.comments) {
        _.set(obj, 'Comments', obj.comments);
      }

      if (obj.createdBy) {
        _.set(obj, 'Created By', obj.createdBy);
      }

      if (obj.creditLimit) {
        _.set(obj, 'Credit Limit', obj.creditLimit);
      }

      if (obj.currentAssignment) {
        _.set(obj, 'Current Assignment', obj.currentAssignment);
      }

      if (obj.currentBalance) {
        _.set(obj, 'Current Balance', obj.currentBalance);
      }

      if (obj.currentStatus) {
        _.set(obj, 'Current Status', obj.currentStatus);
      }

      if (obj.customerRefNo) {
        _.set(obj, 'Customer Reference Number', obj.customerRefNo);
      }

      if (obj.dateCreated) {
        _.set(obj, 'Date Created', obj.dateCreated);
      }

      if (obj.days30) {
        _.set(obj, '30 Days', obj.days30);
      }

      if (obj.days60) {
        _.set(obj, '60 Days', obj.days60);
      }

      if (obj.days90) {
        _.set(obj, '90 Days', obj.days90);
      }

      if (obj.days120) {
        _.set(obj, '120 Days', obj.days120);
      }

      if (obj.days150) {
        _.set(obj, '150 Days', obj.days150);
      }

      if (obj.days180) {
        _.set(obj, '180 Days', obj.days180);
      }

      if (obj.debitOrderDate) {
        _.set(obj, 'Debit Order Date', obj.debitOrderDate);
      }

      if (obj.debitOrderResubmissionAmount) {
        _.set(obj, 'Debit Order Resubmission Amount', obj.debitOrderResubmissionAmount);
      }

      if (obj.debtorAge) {
        _.set(obj, 'Debtor Age', obj.debtorAge);
      }

      if (obj.email) {
        _.set(obj, 'Email', obj.email);
      }

      if (obj.furtherAction) {
        _.set(obj, 'Further Action', obj.furtherAction);
      }

      if (obj.initialAssignment) {
        _.set(obj, 'Initial Assignment', obj.initialAssignment);
      }

      if (obj.lastPTPAmount) {
        _.set(obj, 'Last PTP Amount', obj.lastPTPAmount);
      }

      if (obj.lastPTPDate) {
        _.set(obj, 'Last PTP Date', obj.lastPTPDate);
      }

      if (obj.lastPaymentAmount) {
        _.set(obj, 'Last Payment Amount', obj.lastPaymentAmount);
      }

      if (obj.lastPaymentDate) {
        _.set(obj, 'Last Payment Date', obj.lastPaymentDate);
      }

      if (obj.name) {
        _.set(obj, 'Company Name', obj.name);
      }

      if (obj.nextVisitDate) {
        _.set(obj, 'Next Visit Date', obj.nextVisitDate);
      }

      if (obj.paymentDueDate) {
        _.set(obj, 'Payment Due Date', obj.paymentDueDate);
      }

      if (obj.paymentMethod) {
        _.set(obj, 'Payment Method', obj.paymentMethod);
      }

      if (obj.paymentTermDays) {
        _.set(obj, 'Payment Term Days', obj.paymentTermDays);
      }

      if (obj.pendReason) {
        _.set(obj, 'Pend Reason', obj.pendReason);
      }

      if (obj.ptpAmount) {
        _.set(obj, 'PTP Amount', obj.ptpAmount);
      }

      if (obj.ptpDate) {
        _.set(obj, 'PTP Date', obj.ptpDate);
      }

      if (obj.reassignedBy) {
        _.set(obj, 'Reassigned By', obj.reassignedBy);
      }

      if (obj.reassignedDate) {
        _.set(obj, 'Reassigned Date', obj.reassignedDate);
      }

      if (obj.regNumber) {
        _.set(obj, 'Registration Number', obj.regNumber);
      }

      if (obj.reopenedBy) {
        _.set(obj, 'Reopened By', obj.reopenedBy);
      }

      if (obj.reopenedDate) {
        _.set(obj, 'Reopened Date', obj.reopenedDate);
      }

      if (obj.representativeName) {
        _.set(obj, 'Representative Name', obj.representativeName);
      }

      if (obj.resolution) {
        _.set(obj, 'Resolution', obj.resolution);
      }

      if (obj.telephone) {
        _.set(obj, 'Representative Telephone', obj.telephone);
      }

      if (obj.totalBalance) {
        _.set(obj, 'Total Balance', obj.totalBalance);
      }

      if (obj.type) {
        _.set(obj, 'Type of Client', obj.type);
      }

      if (obj.updatedBy) {
        _.set(obj, 'Updated By', obj.updatedBy);
      }

      if (obj.updatedDate) {
        _.set(obj, 'Updated Date', obj.updatedDate);
      }

    });
  }

  setExportData(tableChangeEvent) {
    console.log('setExportData...');
    let table = document.getElementsByTagName('table');
    let exportData = [];

    for (var r = 0, n = table[1].rows.length; r < n; r++) {
      let row = [];
      for (var c = 0, m = table[1].rows[r].cells.length; c < m; c++) {
        row.push(table[1].rows[r].cells[c].innerHTML);
      }
      this.exportData.push(row);
    }

    this.setState({ exportData });
  }

  render() {
    let table = document.getElementsByTagName('table');
    let exportData = [];

    if (table[1] != null) {
      for (var r = 0, n = table[1].rows.length; r < n; r++) {
        let row = [];
        for (var c = 0, m = table[1].rows[r].cells.length; c < m; c++) {
          row.push(table[1].rows[r].cells[c].innerHTML);
        }
        exportData.push(row);
      }
    }

    return (
      <div>
        <h3 className="mb-3">Report</h3>
        <MDBRow className="mb-3">
          <MDBBtn color="mdb-color" onClick={this.loadCollectionRecords}>Load Collection Records</MDBBtn>
          <CSVLink data={exportData} filename={"theSystemDataExport.csv"}>
            <MDBBtn color="mdb-color">Export</MDBBtn>
          </CSVLink>
        </MDBRow>
        <PivotTableUI
          id="pivotTable"
          data={this.reportData}
          onChange={(s) => {
            this.setState(s);
            this.setState(s); //DO NOT DELETE THIS LINE, it makes sure that the export data is not one entry behind.
          }}
          {...this.state}
        />
      </div>
    )
  }
}
