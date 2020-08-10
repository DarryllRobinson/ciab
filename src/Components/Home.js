import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.mysqlLayer = new MysqlLayer();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  async handleLogoutClick() {
    console.log('Home props: ', this.props);
    let cwsUser = '';
    cwsUser = sessionStorage.getItem('cwsUser');
    await this.mysqlLayer.Delete(`/admin/sessions/${cwsUser}`, { withCredentials: true })
    .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="jumbotron">
              <h1>The System</h1>
                <p className="lead">Your one-stop-shop for a complete customer lifecycle workflow solution</p>
                <hr className="my-4" />

                <div className="row">
                  <h4>Recent updates</h4>
                  <div className="col-8">
                    <ul>
                    <li>
                      All outcomes now automatically close on update
                    </li>
                    <li>
                      Cases without associated outcomes no longer crash the display
                    </li>
                    <li>
                      All Save & Pend functionality for Collections cases and outcomes
                    </li>
                    </ul>
                  </div>
                </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Home;
