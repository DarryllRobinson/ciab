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
                        2020-08-26 Last PTP date and amount and Next visit date and time are displayed now too
                      </li>
                      <li>
                        2020-08-26 Resolution changed to Outcome result instead
                      </li>
                      <li>
                        2020-08-26 Finally got the worklists to work dynamically!! Still need to make them make sense but one step at a time...
                      </li>
                      <li>
                        2020-08-25 Formatting of extra contact details - including cliackable phone numbers
                      </li>
                      <li>
                        2020-08-24 Next visit date and time and next steps displayed in outcome history
                      </li>
                      <li>
                        2020-08-24 Transaction type checks for number or email used
                      </li>
                      <li>
                        2020-08-24 Outcome history and notes hopefully displayed in descending order of date
                      </li>
                      <li>
                        2020-08-23 Some format tinkering and correcting the checking for Transaction Type and Call/Email
                      </li>
                      <li>
                        2020-08-21 Extra contact details in clickable component just above the Outomes history section
                      </li>
                      <li>
                        2020-08-20 Outcomes sorted by descending order of outcome createdDate
                      </li>
                      <li>
                        2020-08-20 Format of Outcomes ptpDate and debitResubmissionDate improved
                      </li>
                      <li>
                        2020-08-20 Fixed Save & Pend functionality
                      </li>
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
