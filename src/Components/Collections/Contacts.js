import React from 'react';
import { Accordion, Card, Col, Row } from 'react-bootstrap';

function Contacts(props) {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click for more contact details
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Row>
              <Col>primaryContactName: {props.contacts[0].primaryContactName}</Col>
              <Col>primaryContactNumber: {props.contacts[0].primaryContactNumber}</Col>
              <Col>primaryContactEmail: {props.contacts[0].primaryContactEmail}</Col>
            </Row>
            <Row>
              <Col>representativeName: {props.contacts[0].representativeName}</Col>
              <Col>representativeNumber: {props.contacts[0].representativeNumber}</Col>
              <Col>representativeEmail: {props.contacts[0].representativeEmail}</Col>
            </Row>
            <Row>
              <Col>alternativeRepName: {props.contacts[0].alternativeRepName}</Col>
              <Col>alternativeRepNumber: {props.contacts[0].alternativeRepNumber}</Col>
              <Col>alternativeRepEmail: {props.contacts[0].alternativeRepEmail}</Col>
            </Row>
            <Row>
              <Col>otherNumber1: {props.contacts[0].otherNumber1}</Col>
              <Col>otherNumber2: {props.contacts[0].otherNumber2}</Col>
              <Col>otherNumber3: {props.contacts[0].otherNumber3}</Col>
            </Row>
            <Row>
              <Col>otherNumber4: {props.contacts[0].otherNumber4}</Col>
              <Col>otherNumber5: {props.contacts[0].otherNumber5}</Col>
              <Col>otherEmail1: {props.contacts[0].otherEmail1}</Col>
            </Row>
            <Row>
              <Col>otherEmail2: {props.contacts[0].otherEmail2}</Col>
              <Col>otherEmail3: {props.contacts[0].otherEmail3}</Col>
              <Col>otherEmail4: {props.contacts[0].otherEmail4}</Col>
            </Row>
            <Row>
              <Col>otherEmail5: {props.contacts[0].otherEmail5}</Col>
              <Col>dnc1: {props.contacts[0].dnc1}</Col>
              <Col>dnc2: {props.contacts[0].dnc2}</Col>
            </Row>
            <Row>
              <Col>dnc3: {props.contacts[0].dnc3}</Col>
              <Col>dnc4: {props.contacts[0].dnc4}</Col>
              <Col>dnc5: {props.contacts[0].dnc5}</Col>
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Contacts;
