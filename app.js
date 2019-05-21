'use strict';
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const path = require("path");
const fs = require("fs");

const authorization = require('./app/policies/auth');

//const winston = require("./config/winston-config-rotate");
//const logDirectory = path.join(__dirname, "logs");

const app = express();

// ENSURE LOG DIRECTORY EXISTS
//fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

////SETUP THE WINSTON STREAM
//app.use(morgan("combined", { stream: winston.stream }));

//INJECT CONTROLLERS
const CoordinatorsController = require('./app/controllers/coordinators');
const Schoolscontroller = require('./app/controllers/schools');
const ProgramsControllers = require('./app/controllers/programs');
const StatesControllers = require('./app/controllers/states');

const TestControllers = require('./app/controllers/test');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api', authorization.authorize);

app.use('/api/authenticate', authorization.authenticate);

app.use('/api/coordinators', CoordinatorsController);

app.use('/api/programs', ProgramsControllers);

app.use('/api/schools', Schoolscontroller);

app.use('/api/states', StatesControllers);

//=============demo============================
app.use('/api/token', TestControllers);


function requireAdmin(req, res, next) {
    var response = res;
    var currentUserRole = "admin"; //get current user role
    if ('admin' == currentUserRole) {
        next();
    }
    else {
        next(new Error("Permission denied."));
        return;
    }
};

//IF WE ARE HERE THEN THE SPECIFIED REQUEST IS NOT FOUND
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//ALL OTHER REQUESTS ARE NOT IMPLEMENTED.
app.use((err, req, res, next) => {
    // error level logging
    //winston.error(winston.combinedFormat(err, req, res));
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

module.exports = app;