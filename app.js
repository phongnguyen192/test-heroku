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

//SETUP THE WINSTON STREAM
//app.use(morgan("combined", { stream: winston.stream }));

//INJECT CONTROLLERS
const {
    Schoolscontrollers,
    SurveyPeriodControllers,
    ProgramsControllers,
    LookupTypeControllers,
    TestControllers,
    StatesControllers
} = require('./app/controllers');

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api', authorization.validateToken);

app.use('/api/authenticate', authorization.authenticate);

app.use('/api/programs', ProgramsControllers);

app.use('/api/schools', Schoolscontrollers);

app.use('/api/surveys', SurveyPeriodControllers);

app.use('/api/lookupTypes', LookupTypeControllers);

app.use('/api/states', StatesControllers);
//=============demo============================
app.use('/api/token', TestControllers);
app.use('/api/test', TestControllers);



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
        Error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

module.exports = app;