'use strict';

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _routes = require('./src/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// Application-Level Middleware

app.use((0, _cors2.default)());

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Welcome');
});

// Routes
app.use('/api/emailLogs', _routes2.default.emailLogs);

//IF WE ARE HERE THEN THE SPECIFIED REQUEST IS NOT FOUND
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//ALL OTHER REQUESTS ARE NOT IMPLEMENTED.
app.use(function (err, req, res, next) {
  // error level logging
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

// Start
var PORT = process.env.API_PORT || 3010;
//CREATE A SERVER
var server = _http2.default.createServer(app);
server.listen(PORT);
console.log('RESTful API server started on: ' + PORT);