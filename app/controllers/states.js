'use strict';
const express = require('express');
const router = express.Router();
const { State, School, Person } = require('../../sequelize');

// RETURNS ALL THE STATES IN THE DATABASE
router.get('/', (req, res, next) => {
  State.findAndCountAll({
    attributes: ['State_Nm', 'State_Cd'],
    order: [
      ['State_Nm', 'ASC'],
    ],
    include: [{
      model: Person,
      attributes: ['First_Nm', 'Last_Nm', 'Addr_Street_Ln1', 'Addr_Street_Ln2', 'Addr_City_Nm', 'Addr_State_Cd', 'Addr_Postal_Cd', 'Addr_Postal4_Cd', 'Email_Txt'],
      required: true
    }]
  })
    .then((result) => res.status(200).send(result))
    .catch(next);
});

module.exports = router;