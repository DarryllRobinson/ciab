import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      storeId: '',
      type: '',
      f_clientId: '',
      createdDate: '',
      registrationErrors: '',
      clients: []
    }

    this.mysqlLayer = new MysqlLayer();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let clients = await this.mysqlLayer.Get(`/admin/clients`, { withCredentials: true });
    console.log('clients: ', clients);
    await this.setState({ clients: clients });
  }

  handleChange(event) {
    //console.log('[event.target.name]: ', [event.target.name]);
    //console.log('event.target.value: ', event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Don't let the missing this.state.values confuse you below :)
    const {
      firstName,
      surname,
      email,
      phone,
      //password,
      role,
      storeId,
      type,
      f_clientId
    } = this.state;

    if (f_clientId !== '' && role !== '' && storeId !== '') {
      // bcrypt password
      const salt = bcrypt.genSaltSync(10);
      //const hash = bcrypt.hashSync("b0oBi35", salt);

      bcrypt.hash(this.state.password, salt, async (err, hash) => {
         await this.setState({ password: hash });
         //console.log('hashed password: ', this.state.password);

         const createdDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

         const user = {
           firstName: firstName,
           surname: surname,
           email: email,
           phone: phone,
           password: hash,
           role: role,
           storeId: storeId,
           type: type,
           f_clientId: f_clientId,
           createdDate: createdDate
         }

         //console.log('user: ', user);

         this.mysqlLayer.Post(`/admin/user`, user, { withCredentials: true }
         ).then(response => {
           console.log('response: ', response);
           if (response.data === 'user exists') {
             let message = 'User already exists. Please create a new username (email).';
             this.handleFailedReg(message);
           } else if (response.data.affectedRows === 1) {
             this.handleSuccessfulAuth();
           } else {
             console.log('Log error to registrationErrors');
           }
         }).catch(error => {
           console.log('Registration error: ', error);
         });
      });
    } else {
      toast('Please ensure you have selected a role and client from the lists', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  handleFailedReg(message) {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }

  handleSuccessfulAuth() {
    toast(`${this.state.firstName} has been added to the system`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    this.setState({
      firstName: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      role: '',
      storeId: '',
      type: '',
      f_clientId: '',
      createdDate: ''
    });
  }

  render() {
    const clientList = this.state.clients.map((client, idx) =>
        <option key={idx} value={client.id}>{client.name}</option>
    );

    return (
      <div className="col-lg-4">
        <div className="form-group" style={{padding: "20px"}}>
          <form onSubmit={this.handleSubmit}>

            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="surname"
              placeholder="Surname"
              className="form-control"
              value={this.state.surname}
              onChange={this.handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Mobile"
              className="form-control"
              value={this.state.phone}
              onChange={this.handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <div className="form-group">
              <select className="custom-select" name="role" onChange={this.handleChange} required>
                <option >Role</option>
                <option value="agent">Agent</option>
                <option value="store">Store agent</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <select className="custom-select" name="storeId" onChange={this.handleChange} required>
                <option >Store ID</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="form-group">
              <select className="custom-select" name="type" onChange={this.handleChange} required>
                <option >Type</option>
                <option value="business">Business</option>
                <option value="consumer">Consumer</option>
              </select>
            </div>

            <div className="form-group">
              <select className="custom-select"
                name="f_clientId"
                onChange={this.handleChange}
                required
              >
                <option>Client</option>
                {clientList}
              </select>
            </div>

            <button className="btn btn-secondary" type="submit">Register</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
  }
}
