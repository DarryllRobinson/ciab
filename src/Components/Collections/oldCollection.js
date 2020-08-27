import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import Contacts from './Contacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import DateTime from 'react-datetime';
import NumberFormat from 'react-number-format';
import './datetime.css';

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountStatus: null,
      caseNotes: null,
      changesMade: false,
      cipcStatus: null,
      clientId: sessionStorage.getItem('cwsClient'),
      collection: null,
      contactPerson: null,
      contactRecords: null,
      debitResubmissionAmount: null,
      debitResubmissionDate: null,
      disabled: false,
      emailUsed: null,
      nextVisitDateTime: null,
      nextSteps: null,
      numberCalled: null,
      outcome: null,
      outcomeNotes: null,
      outcomeRecords: null,
      pendReason: '---',
      prevStatus: 'Open',
      ptpAmount: null,
      ptpDate: null,
      recordId: null,
      resolution: '---',
      transactionType: null,
      type: null,
      user: sessionStorage.getItem('cwsUser'),
      workspace: null,
    }

    this.mysqlLayer = new MysqlLayer();
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.pendRecord = this.pendRecord.bind(this);
    this.closeRecord = this.closeRecord.bind(this);
    this.updateRecord = this.updateRecord.bind(this);

  }

  async componentDidMount() {
    //let record = [];
    //console.log('this.props.location: ', this.props.location);
    //console.log('this.props.location.state !== undefined: ', this.props.location.state === undefined);
    // check if there are any props or send to the dashboard again
    if (this.props.location.state === undefined) {
      this.notify('error', 'The record was not found. Returning to the dashboard.', false);
      //alert('Buggered');
    } else if (this.props.location.state !== undefined) {
      // initial setting of state - need this in case someone tries to pull a record not found in the db
      const type = this.props.location.state.type;
      const workspace = this.props.location.state.workspace;
      const recordId = this.props.location.state.caseId;

      this.setState({
        recordId: recordId,
        type: type,
        workspace: workspace
      });

      const clientId = this.state.clientId;

      let record = null;
      await this.mysqlLayer.Get(`/${type}/${workspace}/read_item/${clientId}/${recordId}`)
        .then(response => {
          //console.log('Collection response: ', response);
          if (response) record = response;
        }
      );

      // Check if there are any associated outcomes to load
      let outcomeRecords = null;
      await this.mysqlLayer.Get(`/${type}/${workspace}/read_outcomes/${clientId}/${recordId}`)
        .then(outcomeResponse => {
          //console.log('Outcome records response: ', outcomeResponse);
          if (outcomeResponse) outcomeRecords = outcomeResponse;
        }
      );

      // Check if there are any extra contact details to load
      let contactRecords = null;
      await this.mysqlLayer.Get(`/${type}/${workspace}/read_contacts/${clientId}/${recordId}`)
        .then(contactResponse => {
          //console.log('contactRecords records response: ', contactResponse);
          if (contactResponse) contactRecords = contactResponse;
        }
      );

      // Getting all the config for dropdown lists, etc
      let resolutions = await this.mysqlLayer.Get(`/admin/resolutions/list_all`);
      let pends = await this.mysqlLayer.Get(`/admin/pendreasons/list_all`);
      let transactionTypes = await this.mysqlLayer.Get(`/admin/transactiontypes/list_all`);
      let accountStatuses = await this.mysqlLayer.Get(`/admin/accountstatuses/list_all`);
      let cipcStatuses = await this.mysqlLayer.Get(`/admin/cipcstatuses/list_all`);

      // saving the previous status so we can unlock it properly after releasing the record
      const prevStatus = record[0].currentStatus;

      this.setState({
        accountStatuses: accountStatuses,
        accountStatus: record.accountStatus,
        caseNotes: record.caseNotes,
        cipcStatuses: cipcStatuses,
        cipcStatus: record.cipcStatus,
        contactRecords: contactRecords,
        collection: record,
        outcomeRecords: outcomeRecords,
        pendReasons: pends,
        prevStatus: prevStatus,
        resolutions: resolutions,
        transactionTypes: transactionTypes
      });

      // lock the record so no other agent accidentally opens it
      const dateTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const update = {
        currentStatus: 'Locked',
        lockedDatetime: dateTime
      };
      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].caseNumber}`, update);
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

  handleDate(e){
    if (typeof e !== 'string') {
      const nextVisitDateTime = moment(e.toDate()).format("YYYY-MM-DD HH:mm:ss");
      console.log('nextVisitDateTime: ', nextVisitDateTime);
      this.setState({ nextVisitDateTime: nextVisitDateTime });
    }
  };

  async handleChange(e) {
    const value = e.target.value;
    console.log('value: ', value);
    const name = [e.target.name];
    console.log('[e.target.name]: ', name);
    await this.setState({
      [e.target.name]: e.target.value,
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
      currentStatus: this.state.prevStatus
    };
    await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].caseNumber}`, update);

    setTimeout(() => this.props.history.push({
      pathname: '/workzone/collections',
      state: {
        recordStatus: this.state.prevStatus,
        clientId: this.state.clientId,
        type: this.state.type,
        workspace: this.state.workspace
      }
    }), timer);
  }

  async pendRecord() {
    const {
      contactPerson,
      debitResubmissionAmount,
      debitResubmissionDate,
      emailUsed,
      nextSteps,
      nextVisitDateTime,
      numberCalled,
      outcome,
      outcomeNotes,
      pendReason,
      ptpDate,
      ptpAmount,
      transactionType,
      user
    } = this.state;
    const notes = this.state.outcomeNotes;

    // checking all the mandatory fields are populated
    let problems = [];
    if (contactPerson === null) problems.push('Please enter a contact person');
    if (emailUsed === null && transactionType === 'Email') problems.push('Please provide an email address');
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (nextSteps === null) problems.push('Please provide the next steps');
    if (nextVisitDateTime === null) problems.push('Please provide a next visit date and time');
    if (numberCalled === null && transactionType === 'Call') problems.push('Please provide a telephone number');
    if (!outcome) problems.push('Please select an outcome resolution');
    if (pendReason === '---') problems.push('Please select a pend reason');
    if (ptpDate && !ptpAmount) problems.push('Please provide a PTP amount');
    if (!ptpDate && ptpAmount) problems.push('Please provide a PTP date');
    if (debitResubmissionDate && !debitResubmissionAmount) problems.push('Please provide a debit resubmission amount');
    if (!debitResubmissionDate && debitResubmissionAmount) problems.push('Please provide a debit resubmission date');
    if (transactionType === null) problems.push('Please enter a transaction type');

    if (problems.length === 0) {//if (notes && notes.length > 10 && nextVisitDateTime !== null && pendReason !== '---') {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].outcomeNotes ? this.state.collection[0].outcomeNotes + `\n\r` : '';

      let newNote = oldNotes + outcomeNotes;
      let closedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let closedBy = user;

      let customerUpdate = {
        cipcStatus: this.state.cipcStatus,
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let caseUpdate = {
        currentStatus: 'Pended',
        pendReason: pendReason,
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeInsert = '';
      let accountUpdate = '';
      if (!ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: moment(ptpDate).format('YYYY-MM-DD'),
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (!ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: moment(ptpDate).format('YYYY-MM-DD'),
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      }

      await this.mysqlLayer.Put(`/${this.state.type}/customers/update_item/${this.state.clientId}/${this.state.collection[0].customerRefNo}`, customerUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/accounts/update_item/${this.state.clientId}/${this.state.collection[0].accountNumber}`, accountUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].caseNumber}`, caseUpdate);

      await this.mysqlLayer.Post(`/${this.state.type}/outcomes/create_item/${this.state.clientId}`, outcomeInsert);
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
    const {
      contactPerson,
      debitResubmissionAmount,
      debitResubmissionDate,
      emailUsed,
      nextSteps,
      nextVisitDateTime,
      numberCalled,
      outcome,
      outcomeNotes,
      ptpDate,
      ptpAmount,
      transactionType,
      user
    } = this.state;
    const notes = this.state.outcomeNotes;

    // checking all the mandatory fields are populated
    let problems = [];
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (emailUsed === null && transactionType === 'Email') problems.push('Please provide an email address');
    if (numberCalled === null && transactionType === 'Call') problems.push('Please provide a telephone number');
    if (ptpDate && !ptpAmount) problems.push('Please provide a PTP amount');
    if (!ptpDate && ptpAmount) problems.push('Please provide a PTP date');
    if (debitResubmissionDate && !debitResubmissionAmount) problems.push('Please provide a debit resubmission amount');
    if (!debitResubmissionDate && debitResubmissionAmount) problems.push('Please provide a debit resubmission date');
    if (!outcome) problems.push('Please select an outcome resolution');

    if (problems.length === 0) {//if (notes && notes.length > 10 && nextVisitDateTime !== null && pendReason !== '---') {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].outcomeNotes ? this.state.collection[0].outcomeNotes + `\n\r` : '';

      let newNote = oldNotes + outcomeNotes;
      let closedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let closedBy = user;

      let customerUpdate = {
        cipcStatus: this.state.cipcStatus,
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let caseUpdate = {
        currentStatus: 'Open',
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeInsert = '';
      let accountUpdate = '';
      if (!ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: ptpDate,
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (!ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: ptpDate,
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      }

      await this.mysqlLayer.Put(`/${this.state.type}/customers/update_item/${this.state.clientId}/${this.state.collection[0].customerRefNo}`, customerUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/accounts/update_item/${this.state.clientId}/${this.state.collection[0].accountNumber}`, accountUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].caseNumber}`, caseUpdate);

      await this.mysqlLayer.Post(`/${this.state.type}/outcomes/create_item/${this.state.clientId}`, outcomeInsert);
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
    const {
      contactPerson,
      debitResubmissionAmount,
      debitResubmissionDate,
      emailUsed,
      nextSteps,
      nextVisitDateTime,
      numberCalled,
      outcome,
      outcomeNotes,
      ptpDate,
      ptpAmount,
      transactionType,
      user
    } = this.state;
    const notes = this.state.outcomeNotes;

    // checking all the mandatory fields are populated
    let problems = [];
    if (!notes || notes.length < 10) problems.push('Please enter a note longer than 10 characters');
    if (emailUsed === null && transactionType === 'Email') problems.push('Please provide an email address');
    if (numberCalled === null && transactionType === 'Call') problems.push('Please provide a telephone number');
    if (ptpDate && !ptpAmount) problems.push('Please provide a PTP amount');
    if (!ptpDate && ptpAmount) problems.push('Please provide a PTP date');
    if (debitResubmissionDate && !debitResubmissionAmount) problems.push('Please provide a debit resubmission amount');
    if (!debitResubmissionDate && debitResubmissionAmount) problems.push('Please provide a debit resubmission date');
    if (!outcome) problems.push('Please select an outcome resolution');

    if (problems.length === 0) {//if (notes && notes.length > 10 && nextVisitDateTime !== null && pendReason !== '---') {
      this.setState({ disabled: true });
      let oldNotes = this.state.collection[0].outcomeNotes ? this.state.collection[0].outcomeNotes + `\n\r` : '';

      let newNote = oldNotes + outcomeNotes;
      let closedDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      let closedBy = user;

      let customerUpdate = {
        closedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        closedBy: user,
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let caseUpdate = {
        currentStatus: 'Closed',
        resolution: outcome,
        updatedBy: user,
        updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      };

      let outcomeInsert = '';
      let accountUpdate = '';
      if (!ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && !debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: ptpDate,
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (!ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      } else if (ptpDate && debitResubmissionDate) {

        accountUpdate = {
          accountStatus: this.state.accountStatus,
          lastPTPDate: moment(ptpDate).format('YYYY-MM-DD'),
          lastPTPAmount: ptpAmount,
          updatedBy: user,
          updatedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        };

        outcomeInsert = {
          createdBy: user,
          outcomeStatus: 'Closed',
          transactionType: transactionType,
          numberCalled: numberCalled,
          emailUsed: emailUsed,
          contactPerson: contactPerson,
          outcome: outcome,
          outcomeNotes: newNote,
          ptpDate: ptpDate,
          ptpAmount: ptpAmount,
          nextVisitDateTime: nextVisitDateTime,
          nextSteps: nextSteps,
          closedDate: closedDate,
          closedBy: closedBy,
          debitResubmissionDate: moment(debitResubmissionDate).format('YYYY-MM-DD'),
          debitResubmissionAmount: debitResubmissionAmount,
          f_caseNumber: this.state.collection[0].caseNumber
        };
      }

      await this.mysqlLayer.Put(`/${this.state.type}/customers/update_item/${this.state.clientId}/${this.state.collection[0].customerRefNo}`, customerUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/accounts/update_item/${this.state.clientId}/${this.state.collection[0].accountNumber}`, accountUpdate);
      await this.mysqlLayer.Put(`/${this.state.type}/cases/update_item/${this.state.clientId}/${this.state.collection[0].caseNumber}`, caseUpdate);

      await this.mysqlLayer.Post(`/${this.state.type}/outcomes/create_item/${this.state.clientId}`, outcomeInsert);
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

    const index = collection.length - 1; // to get the most recent data for whatever field

    let paymentDueDate = '';
    if (this.state.collection[0].paymentDueDate !== undefined) {
      paymentDueDate = this.state.collection[0].paymentDueDate ?
        moment(collection[0].paymentDueDate).format('YYYY-MM-DD') :
        '';
    }

    const debitOrderDate = this.state.collection[0].debitOrderDate ?
      moment(collection[0].debitOrderDate).format('YYYY-MM-DD') :
      '';

    const lastPaymentDate = this.state.collection[0].lastPaymentDate ?
      moment(collection[0].lastPaymentDate).format('YYYY-MM-DD') :
      '';

    const lastPTPDate = this.state.collection[0].lastPTPDate ?
      moment(collection[0].lastPTPDate).format('YYYY-MM-DD') :
      '';

    //this.state.outcomeRecords.forEach(record => console.log('nvdt: ', record.id, record.nextVisitDateTime));
    let nextVisitDateTime = '';
    if (this.state.outcomeRecords[index].nextVisitDateTime !== undefined) {
      nextVisitDateTime = this.state.outcomeRecords[index].nextVisitDateTime ?
        moment(this.state.outcomeRecords[index].nextVisitDateTime).format('YYYY-MM-DD HH:mm:ss') :
        '';
    }

    let outcomesNotes = '';
    if (this.state.outcomeRecords.length > 0 && this.state.outcomeRecords[0].outcomeNotes !== undefined) {
      let outcomesNotesArray = [];
      this.state.outcomeRecords.forEach((outcomeRecord, idx) => {
        outcomesNotesArray[idx] = outcomeRecord.outcomeNotes + '\n\r'
      });
      outcomesNotes = outcomesNotesArray.join('\n');
    } else {
      outcomesNotes = 'No notes to display';
    }

    let outcomes = '';
    if (this.state.outcomeRecords.length > 0 && this.state.outcomeRecords[0].outcome !== undefined) {
      let outcomeArray = [];
      this.state.outcomeRecords.forEach((outcomeRecord, idx) => {
        let ptpDate = outcomeRecord.ptpDate ? moment(outcomeRecord.ptpDate).format('YYYY-MM-DD') : '--';
        let debitResubmissionDate = outcomeRecord.debitResubmissionDate ? moment(outcomeRecord.debitResubmissionDate).format('YYYY-MM-DD') : '--';

        outcomeArray[idx] = moment(outcomeRecord.createdDate).format('YYYY-MM-DD HH:mm:ss') + ' by user ' + outcomeRecord.createdBy + '\n' +
        'Transaction type: ' + outcomeRecord.transactionType + '\n' +
        'Contacted person: ' + outcomeRecord.contactPerson + '\n' +
        'Number called: ' + outcomeRecord.numberCalled + '\n' +
        'Email used: ' + outcomeRecord.emailUsed + '\n' +
        'PTP date: ' + ptpDate + '\n' +
        'PTP amount: R' + outcomeRecord.ptpAmount + '\n' +
        'Pend reason: ' + outcomeRecord.pendReason + '\n' +
        'Debit order resubmission date: ' + debitResubmissionDate + '\n' +
        'Debit order resubmission amount: R' + outcomeRecord.debitResubmissionAmount + '\n' +
        'Outcome resolution: ' + outcomeRecord.outcome + '\n' +
        'Next visit date and time: ' + moment(outcomeRecord.nextVisitDateTime).format('YYYY-MM-DD HH:mm:ss') + '\n' +
        'Next steps: ' + outcomeRecord.nextSteps + '\n' +
        'Outcome notes: \n' + outcomesNotes + '\n' +
        '-----------------------------------------\n\r'
      });
      outcomes = outcomeArray.join('\n');
    } else {
      outcomes = 'No outcomes to display';
    }

    const resolutionList = [<option key="0" value="---">Outcome Resolution</option>];
    //console.log('resolutionList before: ', resolutionList);
    resolutionList.push(this.state.resolutions.map(resolution =>
      <option key={resolution.id} value={resolution.resolution}>{resolution.resolution}</option>
    ));

    const pendList = [<option key="0" value="---">Pend Reason</option>];
    //console.log('pendList before: ', pendList);
    pendList.push(this.state.pendReasons.map(pend =>
      <option key={pend.id} value={pend.pendreason}>{pend.pendreason}</option>
    ));

    const transactionTypeList = [<option key="0" value="---">Transaction Type</option>];
    //console.log('pendList before: ', pendList);
    transactionTypeList.push(this.state.transactionTypes.map(type =>
      <option key={type.id} value={type.transactiontype}>{type.transactiontype}</option>
    ));

    const accountStatusList = [<option key="0" value={this.state.collection[0].accountStatus}>{this.state.collection[0].accountStatus}</option>];
    accountStatusList.push(this.state.accountStatuses.map(accountStatus =>
      <option key={accountStatus.id} value={accountStatus.accountStatus}>{accountStatus.accountStatus}</option>
    ));

    const cipcStatusList = [<option key="0" value={this.state.collection[0].cipcStatus}>{this.state.collection[0].cipcStatus}</option>];
    cipcStatusList.push(this.state.cipcStatuses.map(cipcStatus =>
      <option key={cipcStatus.id} value={cipcStatus.cipcStatus}>{cipcStatus.cipcStatus}</option>
    ));

    const repNumber = `tel:${collection[0].representativeNumber}`;

    // Setting dates earlier than today as disabled for Next Date and Time
    const yesterday = DateTime.moment().subtract( 1, 'day' );
    const valid = function( current ){
      return current.isAfter( yesterday );
    };

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
                    <select
                      required
                      name="cipcStatus"
                      className="custom-select"
                      onChange={(e) => {this.handleChange(e)}}
                    >
                      {cipcStatusList}
                    </select>
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
                    <select className="custom-select"
                      required
                      name="accountStatus"
                      onChange={this.handleChange}
                    >
                      {accountStatusList}
                    </select>
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
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="nextVisitDateTime">Next Visit Date and Time</label>
                    <input
                      disabled={true}
                      type="text"
                      name="nextVisitDateTime"
                      className="form-control"
                      value={nextVisitDateTime}
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
                    <a
                      href={repNumber}
                      style={{
                        background: "#ECF0F1",
                        border: "1px solid #CED4DA",
                        borderRadius: "0.25rem",
                        color: "#7B8A8B",
                        display: "block",
                        fontSize: "0.9375rem",
                        fontWeight: "400",
                        lineHeight: "1.5",
                        margin: "0",
                        padding: "0.375rem 0.75rem",
                        textDecoration: "underline",
                        width: "100%"
                      }}
                    >
                      {repNumber.substring(4)}
                    </a>

                  </div>
                </div>
              </div>

              <Contacts contacts={this.state.contactRecords} />
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
                  <div className="col-12">
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
                  <div className="col-8">
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

                  <div className="col-4">
                    <div className="form-group">
                      {/* This space left intentionally blank */}
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
                        prefix={'R '}
                        thousandSeparator={true}
                        disabled={false}
                        name="debitResubmissionAmount"
                        onValueChange={(values) => {
                          this.setState({ ptpAmount: values.floatValue })}}
                        value={this.state.ptpAmount || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="resolution">Outcome Resolution</label>
                      <select className="custom-select"
                        required
                        name="outcome"
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
                      <label htmlFor="debitResubmissionDate">Debit Resubmission Date</label>
                      <input
                        disabled={false}
                        type="date"
                        name="debitResubmissionDate"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.debitResubmissionDate || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="debitResubmissionAmount">Debit Resubmission Amount</label>
                      <NumberFormat
                        displayType={'input'}
                        className="form-control"
                        prefix={'R '}
                        thousandSeparator={true}
                        disabled={false}
                        name="debitResubmissionAmount"
                        onValueChange={(values) => {
                          this.setState({ debitResubmissionAmount: values.floatValue })}}
                        value={this.state.debitResubmissionAmount || ''}
                      />
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="pendReason">Pend Reason</label>
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
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="nextVisitDateTime">Next Visit Date and Time</label>
                      <DateTime
                        isValidDate={ valid }
                        onBlur={this.handleDate}
                      />
                    </div>
                  </div>

                  <div className="col-8">
                    <div className="form-group">
                      <label htmlFor="nextSteps">Next Steps</label>
                      <textarea
                        disabled={this.state.disabled}
                        type="text"
                        rows="8"
                        name="nextSteps"
                        onChange={(e) => {this.handleChange(e)}}
                        className="form-control"
                        value={this.state.nextSteps || ''}
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

              <div className="card-body text-center">

                <div className="row">
                  <div className="col-12">
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
        <ToastContainer />

      </div>
    )
  }
}

export default Collection;
