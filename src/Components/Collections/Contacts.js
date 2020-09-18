import React from 'react';
import { Accordion, Card, Col, Form, Row } from 'react-bootstrap';

function clickableNumber(tel) {
  if (tel) {
    let clickableTel = `tel:${tel}`;
    return clickableTel;
  } else {
    return '';
  }
}

function clickableEmail(email) {
  if (email) {
    let clickableLink = `mailto:${email}`;
    return clickableLink;
  } else {
    return '';
  }
}

function Contacts(props) {

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click for more contact details
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Primary contact name</Form.Label>
                  <Form.Control placeholder={props.contacts[0].primaryContactName} readOnly />
                </Col>
                <Col>
                  <Form.Label>Primary contact number</Form.Label>
                  <a href={clickableNumber(props.contacts[0].primaryContactNumber)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].primaryContactNumber).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Primary contact email</Form.Label>
                  <a href={clickableEmail(props.contacts[0].primaryContactEmail)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].primaryContactEmail} readOnly />
                  </a>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Representative name</Form.Label>
                  <Form.Control placeholder={props.contacts[0].representativeName} readOnly />
                </Col>
                <Col>
                  <Form.Label>Representative number</Form.Label>
                  <a href={clickableNumber(props.contacts[0].representativeNumber)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].representativeNumber).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Representative email</Form.Label>
                  <a href={clickableEmail(props.contacts[0].representativeEmail)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].representativeEmail} readOnly />
                  </a>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Alternative representative name</Form.Label>
                  <Form.Control placeholder={props.contacts[0].alternativeRepName} readOnly />
                </Col>
                <Col>
                  <Form.Label>Alternative representative number</Form.Label>
                  <a href={clickableNumber(props.contacts[0].alternativeRepNumber)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].alternativeRepNumber).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Alternative representative email</Form.Label>
                  <a href={clickableEmail(props.contacts[0].alternativeRepEmail)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].alternativeRepEmail} readOnly />
                  </a>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Other number 1</Form.Label>
                  <a href={clickableNumber(props.contacts[0].otherNumber1)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].otherNumber1).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other number 2</Form.Label>
                  <a href={clickableNumber(props.contacts[0].otherNumber2)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].otherNumber2).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other number 3</Form.Label>
                  <a href={clickableNumber(props.contacts[0].otherNumber3)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].otherNumber3).substring(4)} readOnly />
                  </a>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Other number 4</Form.Label>
                  <a href={clickableNumber(props.contacts[0].otherNumber4)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].otherNumber4).substring(4)} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other number 5</Form.Label>
                  <a href={clickableNumber(props.contacts[0].otherNumber5)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={clickableNumber(props.contacts[0].otherNumber5).substring(4)} readOnly />
                  </a>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Other email 1</Form.Label>
                  <a href={clickableEmail(props.contacts[0].otherEmail1)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].otherEmail1} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other email 2</Form.Label>
                  <a href={clickableEmail(props.contacts[0].otherEmail2)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].otherEmail2} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other email 3</Form.Label>
                  <a href={clickableEmail(props.contacts[0].otherEmail3)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].otherEmail3} readOnly />
                  </a>
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Other email 4</Form.Label>
                  <a href={clickableEmail(props.contacts[0].otherEmail4)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].otherEmail4} readOnly />
                  </a>
                </Col>
                <Col>
                  <Form.Label>Other email 5</Form.Label>
                  <a href={clickableEmail(props.contacts[0].otherEmail5)} style={{ textDecoration: "underline" }}>
                    <Form.Control placeholder={props.contacts[0].otherEmail5} readOnly />
                  </a>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Do not contact 1</Form.Label>
                  <Form.Control placeholder={props.contacts[0].dnc1} readOnly />
                </Col>
                <Col>
                  <Form.Label>Do not contact 2</Form.Label>
                  <Form.Control placeholder={props.contacts[0].dnc2} readOnly />
                </Col>
                <Col>
                  <Form.Label>Do not contact 3</Form.Label>
                  <Form.Control placeholder={props.contacts[0].dnc3} readOnly />
                </Col>
              </Row>
              <br />

              <Row>
                <Col>
                  <Form.Label>Do not contact 4</Form.Label>
                  <Form.Control placeholder={props.contacts[0].dnc4} readOnly />
                </Col>
                <Col>
                  <Form.Label>Do not contact 5</Form.Label>
                  <Form.Control placeholder={props.contacts[0].dnc5} readOnly />
                </Col>
                <Col></Col>
              </Row>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Contacts;
