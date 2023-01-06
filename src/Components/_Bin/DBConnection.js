'use strict'
const mysql = require('mysql');
console.log('mysql: ', mysql);

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const connection = mysql.createConnection({
  host: process.env.NODE_ENV === 'development' ? 'localhost' ? 'cp50.domains.co.za',
  user: process.env.NODE_ENV === 'development' ? 'root' : 'thesyste_prod-user',
  port: '3306',
  password: process.env.NODE_ENV === 'development' ? 'password' : 'f6mDG4J5KK2PVj',
  database: process.env.NODE_ENV === 'development' ? 'cws_admin' : 'thesyste_cws_admin'
});

connection.connect(function(err) {
  if (err) {
    return console.error('Connection error: ' + err.message);
  }
  console.log('Connected to the cws_admin MySQL server');
});

function keepalive() {
  connection.query('select 1', [], function(err, result) {
    if(err) return console.log(err);
    // Successul keepalive
    console.log("keepalive: "+ result);
  });
}

setInterval(keepalive, 1000*60*60);

module.exports = connection;
