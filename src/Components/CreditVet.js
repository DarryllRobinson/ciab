import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';

export default class CreditVet extends Component {
  constructor(props) {
    super();

    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {
    console.log('CreditVet mounting');
  }

  render() {
    return (
      <div>
        CreditVet
      </div>
    );
  }
}
