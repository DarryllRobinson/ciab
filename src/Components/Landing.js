import React from 'react';
import { Link } from 'react-router-dom';
import MysqlLayer from '../Utilities/MysqlLayer';
import Security from '../Utilities/Security';
import { userService } from '../Utilities/user.service.js';

export default class Landing extends React.Component {
  constructor(props) {
    super();

    this.state = {
      user: {},
      users: []
    };

    this.security = new Security();
    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
      users: { loading: true }
    });
    userService.getAll().then(users => this.setState({ users }));
  }

  render() {
    const { user, users } = this.state;
      return (
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You are logged in with React & Basic HTTP Authentication!!</p>
          <h3>Users from secure api end point:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.length &&
            <ul>
              {users.map((user, index) =>
                <li key={user.id}>
                    {user.firstName + ' ' + user.surname}
                </li>
              )}
            </ul>
          }
          <p>
              <Link to="/login">Logout</Link>
          </p>
        </div>
      );
    }
}
