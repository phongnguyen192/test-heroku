'use strict';
const express = require('express');
const router = express.Router();
const role = require('../policies/role-base');
const { SurveyPeriod, Program, LookupType, School } = require('../../sequelize');

// RETURNS ALL SURVEYS IN THE DATABASE
router.get('/', role('ADMIN'), (req, res, next) => {
    SurveyPeriod.findAndCountAll(
        {
            attributes: ['Survey_Period_Id', 'Season_Cd', 'Season_Nm', 'Start_Dr', 'End_Dt']
        })
        .then((result) => res.status(200).send(result))
        .catch(next);
});




module.exports = router;