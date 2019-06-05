'use strict';
const express = require('express');
const router = express.Router();
const states = require('../../config/states.json');
const role = require('../policies/role-base');

// RETURNS ALL THE STATES IN THE DATABASE

router.get('/', role('ADMIN'), (req, res, next) => {
  res.status(200).send({ values: states });
});

module.exports = router;