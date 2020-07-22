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
      cols: [],
      progress: 0,
      accountErrors: [],
      customerErrors: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadData = this.uploadData.bind(this);
    this.saveAccountRecordsToDatabase = this.saveAccountRecordsToDatabase.bind(this);
    this.saveCustomerRecordsToDatabase = this.saveCustomerRecordsToDatabase.bind(this);

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

    data.forEach(async datum => {
      let customerId = await this.saveCustomerRecordsToDatabase(datum);
      let accountId = await this.saveAccountRecordsToDatabase(datum, customerId);
      let count = this.state.progress;
      await this.setState({ progress: count + 1 });
    });
    // Post data to customer table first
    /*const insertId = await this.saveCustomerRecordsToDatabase(data);
    console.log('uploadData insertId: ', insertId);
    const uploadStatus = await this.saveAccountRecordsToDatabase(data, insertId);
    console.log('uploadStatus: ', uploadStatus);*/
  }

  async saveCustomerRecordsToDatabase(record) {
    let customer = [
      {
        customerRefNo: record.customerRefNo,
        name: record.name,
        createdBy: record.createdBy,
        type: record.type,
        regNumber: record.regNumber,
        representativeName: record.representativeName,
        telephone: record.telephone,
        f_clientId: sessionStorage.getItem('cwsClient')
      }
    ];
    /*let customers = [];
    records.forEach(record => {
      customers.push({
        customerRefNo: record.customerRefNo,
        name: record.name,
        createdBy: record.createdBy,
        type: record.type,
        regNumber: record.regNumber,
        representativeName: record.representativeName,
        telephone: record.telephone,
        f_clientId: sessionStorage.getItem('cwsClient')
      });
    });*/

    const response = await this.postToDb(customer, 'customers');
    //console.log('saveCustomerRecordsToDatabase response: ', response);
    if (response.data.errno) {
      let error =[];
      error = this.state.customerErrors;
      error.push(response.data);
      await this.setState({ customerErrors: error });
    }
    return response.data.insertId;
  }

  async saveAccountRecordsToDatabase(record, insertId) {
    const paymentDueDate = record.paymentDueDate ?
      moment(record.paymentDueDate).format('YYYY-MM-DD') :
      null;

    const debitOrderDate = record.debitOrderDate ?
      moment(record.debitOrderDate).format('YYYY-MM-DD') :
      null;

    const lastPaymentDate = record.lastPaymentDate ?
      moment(record.lastPaymentDate).format('YYYY-MM-DD') :
      null;

    const lastPTPDate = record.lastPTPDate ?
      moment(record.lastPTPDate).format('YYYY-MM-DD') :
      null;

    let account = [
      {
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
        f_customerId: insertId,
        lastPTPDate: lastPTPDate,
        paymentDueDate: paymentDueDate,
        debitOrderDate: debitOrderDate,
        lastPaymentDate: lastPaymentDate,
        paymentMethod: record.paymentMethod,
        paymentTermDays: record.paymentTermDays,
        totalBalance: record.totalBalance
      }
    ];
    /*let accounts = [];
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
        f_customerId: insertId,
        lastPTPDate: moment(record.lastPTPDate).format('YYYY-MM-DD'),
        paymentMethod: record.paymentMethod,
        paymentTermDays: record.paymentTermDays,
        totalBalance: record.totalBalance
      });
    });*/

    //console.log('Number of records in [accounts]: ', accounts.length);

    //accounts.forEach(async account => {
      let response = await this.postToDb(account, 'accounts');
      //console.log('saveAccountRecordsToDatabase response: ', response);
      if (response.data.errno) {
        let error =[];
        error = this.state.accountErrors;
        error.push(response.data);
        await this.setState({ accountErrors: error });
      }
    //});

    /*const response = await this.postToDb(accounts, 'accounts');
    console.log('saveAccountRecordsToDatabase response: ', response);
    return response;*/
  }

  async postToDb(records, workspace) {
    let type = this.state.type;
    //let workspace = workspace;
    let task = 'create_items';
    let clientId = sessionStorage.getItem('cwsClient');

    const response = await this.mysqlLayer.Post(`/${type}/${workspace}/${task}/${clientId}`, records);
    return response;
  }

  render() {

    const customerErrors = this.state.customerErrors.map((err, idx) =>
      <p key={idx}>Customer error: {err.sqlMessage}</p>
    );

    const accountErrors = this.state.accountErrors.map((err, idx) =>
      <p key={idx}>Account error: {err.sqlMessage}</p>
    );

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
        <p>Number of records uploaded: {this.state.progress}</p>
        {customerErrors}
        {accountErrors}
      </div>

    )
  }
}

export default ExcelReader;
