import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MysqlLayer from '../../Utilities/MysqlLayer';
import Security from '../../Utilities/Security';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
    };

    this.security = new Security();
    this.mysqlLayer = new MysqlLayer();
  }

  async componentDidMount() {
    const users = await this.mysqlLayer.Get('/users');
    this.setState({
      users,
    });
    console.log('users: ', users);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.users === null && <p>Loading questions...</p>}
          {
            this.state.users && this.state.users.map(user => (
              <div key={user.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/users/${user.id}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Name: {user.firstName}</div>
                    <div className="card-header">URL: {`/users/${user.id}`}</div>
                    <div className="card-body">
                      <h4 className="card-title">{user.surname}</h4>
                      <p className="card-text">{user.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Users;
