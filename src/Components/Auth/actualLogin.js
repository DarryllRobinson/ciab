import React, { Component } from "react";
import MysqlLayer from '../../Utilities/MysqlLayer';
import Security from '../../Utilities/Security';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.mysqlLayer = new MysqlLayer();
    this.security = new Security();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    const loginDatetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const user = {
      email: email,
      password: password,
      loginDate: loginDatetime
    };


    await this.mysqlLayer.PostLogin(`/admin/sessions/`, user, { withCredentials: true }
    ).then(response => {
      //console.log('Login props: ', this.props);
      //console.log('Login response: ', response);
      if (response.data[1].logged_in) {
        this.security.writeLoginSession(response.data, loginDatetime);
        this.props.handleSuccessfulAuth(response.data);
      } else {
        toast('Incorrect username or password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({ email: '', password: '' });
      }
    }).catch(error => {
      console.log('Login error: ', error);
    });
  }

  xxxhandleSubmit(event) {
    const { email, password } = this.state;
    const loginDatetime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const user = {
      email: email,
      password: password,
      loginDate: loginDatetime
    };

    this.mysqlLayer.Post(`/admin/usersession`,
        user,
        { withCredentials: true }
      )
      .then(response => {
        console.log('handleSubmit response: ', response);
        if (response.data) {
          this.security.writeLoginSession(response.data[0].email, loginDatetime);
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  sectionToRender() {
    if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
      return (
        <>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
              <input
                type="email"
                name="email"
                className="form-control mr-sm-2"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />


              <input
                type="password"
                name="password"
                className="form-control mr-sm-2"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />

              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Login</button>
              </form>

          <ToastContainer />
        </>
      );
    } else if (this.props.loggedInStatus === "LOGGED_IN") {
      return (
        <button type="button" className="btn btn-secondary" onClick={() => this.props.handleLogoutClick()}>Logout</button>
      );
    } else {
      return (
        <div>loggedInStatus is confused</div>
      );
    }
  }

  render() {
    //console.log('Login props: ', this.props);
    return (
      <>

        {this.sectionToRender()}
        </>

  )}
}
