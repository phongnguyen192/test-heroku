'use strict';
const app = require('./app');
const http = require('http');

//DEFINED PORT
const API_PORT = process.env.PORT || 6001;

//CREATE A SERVER
const server = http.createServer(app);
server.listen(API_PORT);
console.log('RESTful API server started on: ' + API_PORT);