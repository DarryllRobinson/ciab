import React, { Component } from 'react';
import './App.css';
import mysqlLayer from './utils/mysqlLayer';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      users: []
    }

    this.mysqlLayer = new mysqlLayer();
    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    let users = await this.mysqlLayer.Get('/users');
    let rows = [];

    if (users) {
      users.forEach(user => {
        rows.push(user);
      });

      this.setState( {
        users: rows
      });
    }
  }

  render() {
    let users = this.state.users;
    return (
      <div className="App">
        <header className="App-header">
          <div>
            Users {
              users.map((user) => (<p key={user.id}>Name: {user.firstName}</p>))
            }
          </div>
        </header>
      </div>
    );
  }
}
