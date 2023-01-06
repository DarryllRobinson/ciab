import React, { Component } from 'react';
import MysqlLayer from '../Utilities/MysqlLayer';

export default class Menu extends Component {
  constructor(props) {
    super();

    this.mysqlLayer = new MysqlLayer();
  }

  componentDidMount() {
    console.log('Menu mounting');
  }

  render() {
    return (
      <div>
        Menu
      </div>
    );
  }
}
