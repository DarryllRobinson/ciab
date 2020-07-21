import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import MysqlLayer from '../Utilities/MysqlLayer';
import moment from 'moment';

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.saveAccountRecordsToDatabase = this.saveAccountRecordsToDatabase.bind(this);

    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    await this.setState({
      type: sessionStorage.getItem('cwsType')
    });
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
        //console.log(JSON.stringify(this.state.data, null, 2));
        //console.log('data: ', data);
        try {
          this.uploadData(this.state.data);
        } catch(e) {
          console.log('Uploading Collection update file problem (e): ', e);
        }
      });

    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  async uploadData(data) {
    console.log('data: ', data);
    // Post data to customer table first
    this.saveAccountRecordsToDatabase(data);
    //await this.mysqlLayer.Post(`/${type}/${workspace}/upload`, data);
  }

  async saveAccountRecordsToDatabase(records) {
    let accounts = [];
    records.forEach(record => {
      accounts.push({
        accountRef: record.accountRef,
        amountDue: record.amountDue,
        createdBy: record.createdBy,
        //createdDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        creditLimit: record.creditLimit,
        currentBalance: record.currentBalance,
        days30: record.days30,
        days60: record.days60,
        days90: record.days90,
        days120: record.days120,
        f_customerId: record.f_customerId,
        lastPTPDate: moment(record.lastPTPDate).format('YYYY-MM-DD'),
        paymentMethod: record.paymentMethod,
        paymentTermDays: record.paymentTermDays,
        totalBalance: record.totalBalance
      });
    });

    await this.postToDb(accounts, 'accounts');
  }

  async postToDb(records, workspace) {
    let type = this.state.type;
    //let workspace = workspace;
    let task = 'create_item';
    let clientId = sessionStorage.getItem('cwsClient');

    await this.mysqlLayer.Post(`/${type}/${workspace}/${task}/${clientId}`, records);
  }

  render() {
    return (
      <div>
        <label htmlFor="file">Import new records</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input type='submit'
          value="Upload"
          onClick={this.handleFile}
        />
      </div>

    )
  }
}

export default ExcelReader;
