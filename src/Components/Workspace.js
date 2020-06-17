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
      columns: [
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
    let records = await this.mysqlLayer.Get('/workspace/applications');
    let recordStatus = status;
    let rows = [];

    if (records) {
      records.forEach(record => {
        if (record.status === recordStatus) {
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

export default Workspace;
