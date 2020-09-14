import axios from 'axios';
import AppSettings from './appSettings';
import Security from './Security';

export default class MysqlLayer {

  security = new Security();

  // Get route
  async Get(path) {
    this.security.validateSession();

    try {
      //console.log(`Getting from ${AppSettings.serverEndpoint}${path}`);
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
    this.security.validateSession();

    try {
      //console.log(`Posting to ${AppSettings.serverEndpoint}${path}`);
      let response = await axios.post(`${AppSettings.serverEndpoint}${path}`, object, this.setHeaders());
      //console.log('response: ', response);
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

  // Post route for Login only as there is no validateSession
  async PostLogin(path, object) {
    //this.security.validateSession();
    //console.log('path: ', path);
    //console.log('object: ', object);
    try {
      //console.log(`Posting login to from ${AppSettings.serverEndpoint}${path}`);
      let response = await axios.post(`${AppSettings.serverEndpoint}${path}`, object, this.setHeaders());
      //console.log('response: ', response);
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

  // Post route for Change only as there is no validateSession
  async PostChange(path, object) {
    //this.security.validateSession();
    //console.log('path: ', path);
    //console.log('object: ', object);
    try {
      //console.log(`Posting login to from ${AppSettings.serverEndpoint}${path}`);
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
    this.security.validateSession();

    try {
      //console.log(`Putting into ${AppSettings.serverEndpoint}${path}`);
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
    this.security.validateSession();

    try {
      //console.log(`Deleting from ${AppSettings.serverEndpoint}${path}`);
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
    let user = sessionStorage.getItem('cwsUser');
    //console.log('user: ', user);

    return {
      headers: {
        "Accept": "application/json, application/x-www-form-urlencoded",
        "Content-Type": "application/json",
        'User': user
      }
      /*headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Origin, Methods, Content-Type",

      }*/
      , httpsAgent: new https.Agent({ rejectUnauthorized: false, withCredentials: true }),
      //user: user
    }
  }
}
