'use strict';
const PersonModel = require('./person');
const SchoolModel = require('./school');
const ProgramModel = require('./program');
const LookupTypeModel = require('./lookup-type');
const ProgramPersonModel = require('./program-person');
const ProgramMAModel = require('./program-multibit-answers');
const SurveyPeriodModel = require('./survey-period');

module.exports = {
    PersonModel,
    SchoolModel,
    SurveyPeriodModel,
    ProgramModel,
    ProgramPersonModel,
    LookupTypeModel,
    ProgramMAModel
};