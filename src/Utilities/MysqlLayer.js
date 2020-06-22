import axios from 'axios';
import AppSettings from './appSettings';
import Security from './Security';

export default class MysqlLayer {

  security = new Security();

  // Get route
  async Get(path) {
    this.security.validateSession();
    try {
      let response = await axios.get(`${AppSettings.serverEndpoint}${path}`, this.setHeaders());
      return response.data;
    } catch(e) {
      console.log('e: ', e);
      if (!e.response) {
        //alert('Major Get request error: ', e);
        return e;
      }
      if (e.response.status === 500) {
        alert('Get request 500 error: ' + e.response.data.message);
      } else {
        alert('Get request error: ' + e);
      }
    }
  }

  // Post route
  async Post(path, object) {
    //this.security.validateSession();
    console.log('path: ', path);
    console.log('object: ', object);
    try {
      let response = await axios.post(`${AppSettings.serverEndpoint}${path}`, object, this.setHeaders());
      console.log('response: ', response);
      return response;
    } catch(e) {
      console.log('e: ', e);
      if (!e.response) {
        //alert('Major Get request error: ', e);
        return e;
      }
      if (e.response.status === 500) {
        alert('Get request 500 error: ' + e.response.data.message);
      } else {
        alert('Get request error: ' + e);
      }
    }
  }

  // Put route
  async Put(path, object) {
    //this.security.validateSession();
    try {
      let response = await axios.put(`${AppSettings.serverEndpoint}${path}`, object, this.setHeaders());
      return response.data;
    } catch(e) {
      console.log('e: ', e);
      if (!e.response) {
        //alert('Major Get request error: ', e);
        return e;
      }
      if (e.response.status === 500) {
        alert('Get request 500 error: ' + e.response.data.message);
      } else {
        alert('Get request error: ' + e);
      }
    }
  }

  // Delete route
  async Delete(path) {
    //this.security.validateSession();
    try {
      let response = await axios.delete(`${AppSettings.serverEndpoint}${path}`, this.setHeaders());
      return response.data;
    } catch(e) {
      console.log('e: ', e);
      if (!e.response) {
        //alert('Major Get request error: ', e);
        return e;
      }
      if (e.response.status === 500) {
        alert('Get request 500 error: ' + e.response.data.message);
      } else {
        alert('Get request error: ' + e);
      }
    }
  }

  setHeaders() {
    const https = require('https');
    return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      , httpsAgent: new https.Agent({ rejectUnauthorized: false, withCredentials: true })
    }
  }
}
