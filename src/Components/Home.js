import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.mysqlLayer = new MysqlLayer();
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  async handleLogoutClick() {
    //console.log('Home props: ', this.props);
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
                      2020-08-19 CIPC and Account status fields saved in database
                    </li>
                    <li>
                      2020-08-18 Outcome history updated to show more fields
                    </li>
                    <li>
                      2020-08-18 Removed the spurious comma from the text boxes
                    </li>
                    <li>
                      2020-08-13 NavBar is responsive for mobiles
                    </li>
                    <li>
                      2020-08-13 Representative phone number now clickable
                    </li>
                    <li>
                      2020-08-13 Account Notes and Case Date labels corrected in Reports
                    </li>
                    <li>
                      2020-08-13 Outcome and Next Steps swapped in Collection workzone
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
