import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import MysqlLayer from '../../Utilities/MysqlLayer';

class editContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: this.props.location.state.contacts
    }

    this.mysqlLayer = new MysqlLayer();
    this.handleChange = this.handleChange.bind(this);
  }

  saveDetails() {
    console.log('saveDetails');
  }

  handleChange(e) {
    console.log('handling change: ', e.target.name);
    console.log('handling change: ', e.target.value);
    let name = [e.target.name];
    let value = e.target.value;
    console.log('name: ', name);
    console.log('typeof name: ', typeof name);
    console.log('value: ', value);

    this.setState(prevState => ({
      contacts: {
        ...prevState.contacts,
        name: value
      }
    }));
  }

  render() {
    let { contacts } = this.state;
    console.log('render contacts: ', contacts);
    if (!contacts || contacts === undefined) {
      return <div>Loading...</div>
    } else {
      return (
        <Container fluid>
          <Card>

              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Label>Primary contact name</Form.Label>
                      <Form.Control value={contacts.primaryContactName || ''} name="primaryContactName" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Primary contact number</Form.Label>
                      <Form.Control value={contacts.primaryContactNumber || ''} name="primaryContactNumber" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Primary contact email</Form.Label>
                      <Form.Control value={contacts.primaryContactEmail || ''} name="primaryContactEmail" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Representative name</Form.Label>
                      <Form.Control value={contacts.representativeName || ''} name="representativeName" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Representative number</Form.Label>
                      <Form.Control value={contacts.representativeNumber || ''} name="representativeNumber" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Representative email</Form.Label>
                      <Form.Control value={contacts.representativeEmail || ''} name="representativeEmail" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Alternative representative name</Form.Label>
                      <Form.Control value={contacts.alternativeRepName || ''} name="alternativeRepName" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Alternative representative number</Form.Label>
                      <Form.Control value={contacts.alternativeRepNumber || ''} name="alternativeRepNumber" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Alternative representative email</Form.Label>
                      <Form.Control value={contacts.alternativeRepEmail || ''} name="alternativeRepEmail" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Other number 1</Form.Label>
                      <Form.Control value={contacts.otherNumber1 || ''} name="otherNumber1" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other number 2</Form.Label>
                      <Form.Control value={contacts.otherNumber2 || ''} name="otherNumber2" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other number 3</Form.Label>
                      <Form.Control value={contacts.otherNumber3 || ''} name="otherNumber3" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Other number 4</Form.Label>
                      <Form.Control value={contacts.otherNumber4 || ''} name="otherNumber4" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other number 5</Form.Label>
                      <Form.Control value={contacts.otherNumber5 || ''} name="primaryContactName" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Other email 1</Form.Label>
                      <Form.Control value={contacts.otherEmail1 || ''} name="otherEmail1" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other email 2</Form.Label>
                      <Form.Control value={contacts.otherEmail2 || ''} name="otherEmail2" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other email 3</Form.Label>
                      <Form.Control value={contacts.otherEmail3 || ''} name="otherEmail3" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Other email 4</Form.Label>
                      <Form.Control value={contacts.otherEmail4 || ''} name="otherEmail4" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Other email 5</Form.Label>
                      <Form.Control value={contacts.otherEmail5 || ''} name="otherEmail5" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Do not contact 1</Form.Label>
                      <Form.Control value={contacts.dnc1 || ''} name="dnc1" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Do not contact 2</Form.Label>
                      <Form.Control value={contacts.dnc2 || ''} name="dnc2" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Do not contact 3</Form.Label>
                      <Form.Control value={contacts.dnc3 || ''} name="dnc3" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Form.Label>Do not contact 4</Form.Label>
                      <Form.Control value={contacts.dnc4 || ''} name="dnc4" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col>
                      <Form.Label>Do not contact 5</Form.Label>
                      <Form.Control value={contacts.dnc5 || ''} name="dnc5" onChange={(e) => {this.handleChange(e)}} />
                    </Col>
                    <Col></Col>
                  </Row>
                  <br />

                  <Row>
                    <Col>
                      <Button
                        style={{
                          background: "#48B711",
                          borderColor: "#48B711",
                        }}
                        onClick={this.saveDetails}
                      >
                        Save contact details
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>

          </Card>
        </Container>
      );
    }
  }

}

export default editContacts;
