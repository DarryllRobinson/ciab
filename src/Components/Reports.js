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

    this.loadOpenPendRecords = this.loadOpenPendRecords.bind(this);
    this.mysqlLayer = new MysqlLayer();

  }

  componentDidMount() {
    console.log('state: ', this.state);
    this.loadOpenPendRecords();
  }

  async loadOpenPendRecords() {
    const type = this.state.type;
    const workspace = this.state.workspace;
    const clientId = this.state.clientId;

    this.reportData = await this.mysqlLayer.Get(`/${type}/${workspace}/list_all/${clientId}`);
    //console.log('this.reportData: ', this.reportData);
    this.processReportData();
  }

  processReportData() {
    if (!this.reportData) this.reportData = [];

    _.forEach(this.reportData, function(obj) {
      if (obj.caseNotes) {
        _.set(obj, 'Case Notes', obj.caseNotes)
      };
      //console.log('obj: ', obj);
    });
  }

  setExportData(tableChangeEvent) {
    let table = document.getElementsByTagName('table');
    let exportData = [];

  }

  render() {
    let table = document.getElementsByTagName('table');
    let exportData = [];

    return (
      <div>
        <h3 className="mb-3">Report</h3>
        <MDBRow className="mb-3">
          <MDBBtn color="mdb-color" onClick={this.loadOpenTickets}>Load Open Ticket Data</MDBBtn>
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
