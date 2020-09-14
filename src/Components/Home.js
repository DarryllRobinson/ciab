import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';
import { Button, Card, CardDeck, Container } from 'react-bootstrap';
//import banner from '../Assets/Images/Debt-Recovery.jpg';

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
      <Container>
        <h1 className="jumbotron">
          The System
        </h1>

        <p className="intro">
          We know how much your customers mean to you, even the ones that struggle to pay on time.
          Let us take of the stress of collecting what is owed to you so you can focus on your business.
        </p>

        <CardDeck>
          <Card style={{ width: "18rem" }}>
            <Card.Body style={{ padding: "0" }}>
              <Card.Header
                style={{
                  backgroundColor: "#48B711",
                  border: "1px solid #48B711",
                  textAlign: "center",
                  color: "#FFFFFF"
                }}
              >
                Our Collections process
              </Card.Header>
              <Card.Text
                style={{
                  padding: "25px",
                  minHeight: "200px",
                  color: "#717370"
                }}
              >
                The process we follow to ensure you get what is yours whilst protecting your relationship
              </Card.Text>
              <Button
                style={{
                  background: "#3D3735",
                  borderColor: "#3D3735",
                  margin: "0 25% 5% 25%"
                }}
              >
                Find out more
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Body style={{ padding: "0" }}>
              <Card.Header
                style={{
                  backgroundColor: "#48B711",
                  border: "1px solid #48B711",
                  textAlign: "center",
                  color: "#FFFFFF"
                }}
              >
                Our Collections process
              </Card.Header>
              <Card.Text
                style={{
                  padding: "25px",
                  minHeight: "200px",
                  color: "#717370"
                }}
              >
                The process we follow to ensure you get what is yours whilst protecting your relationship
              </Card.Text>
              <Button
                style={{
                  background: "#3D3735",
                  borderColor: "#3D3735",
                  margin: "0 25% 5% 25%"
                }}
              >
                Find out more
              </Button>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body style={{ padding: '0' }}>
              <Card.Header
                style={{
                  backgroundColor: "#48B711",
                  border: "1px solid #48B711",
                  textAlign: "center",
                  color: "#FFFFFF"
                }}
              >
                Our Collections policies
              </Card.Header>
              <Card.Text
                style={{
                  padding: "25px",
                  minHeight: "200px",
                  color: "#717370"
                }}
              >
                The policies we follow to ensure you get what is yours whilst protecting your relationship
              </Card.Text>
              <Button
                style={{
                  background: "#3D3735",
                  borderColor: "#3D3735",
                  margin: "0 25% 5% 25%"
                }}
              >
                Find out more
              </Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </Container>
    )
  }
}

export default Home;
