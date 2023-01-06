import React, { Component } from 'react';
import MysqlLayer from '../../Utilities/MysqlLayer';

import { SF_CONFIG } from './sf-variables';

export default class Salesforce extends Component {
  constructor(props) {
    super(props);

    this.mysqlLayer = new MysqlLayer();

  }

  async componentDidMount() {
    console.log('Main props: ', this.props);
    const conn = {
      username: SF_CONFIG.username,
      password: SF_CONFIG.password,
      grant_type: SF_CONFIG.grant_type,
      client_id: SF_CONFIG.client_id,
      client_secret: SF_CONFIG.client_secret
    }

    let response = await this.mysqlLayer.Post('/salesforce', conn);
    console.log('response: ', response);
  }

  render() {
    return (
      <div>
        Salesforce FTW
      </div>
    )
  }
}
