'use strict';
const Schoolscontrollers = require('./schools');
const ProgramsControllers = require('./programs');
const SurveyPeriodControllers = require('./survey-period');
const LookupTypeControllers = require('./lookup-type');
const StatesControllers = require('./states');

const TestControllers = require('./test');

module.exports = {
    Schoolscontrollers,
    SurveyPeriodControllers,
    ProgramsControllers,
    LookupTypeControllers,
    TestControllers,
    StatesControllers
}