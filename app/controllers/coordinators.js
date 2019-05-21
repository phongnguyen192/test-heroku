'use strict';
const express = require('express');
const router = express.Router();
const { State, School, Person, OperatorsAliases } = require('../../sequelize');

// RETURNS ALL THE PEOPLE IN THE DATABASE
router.get('/', (req, res, next) => {
  const take = (req.query.take)? parseInt(req.query.take) : 30;
  const skip = (req.query.skip)? parseInt(req.query.take) : 0;
  const key = (req.query.search)? req.query.search : '';
  Person.findAndCountAll(
  {
    where: { Last_Nm : { [OperatorsAliases.like]: '%'+ key +'%'} },
    offset: skip,
    limit: take,
    attributes: ['First_Nm', 'Last_Nm', 'Email_Txt']
  })
    .then((result) => res.status(200).send(result))
    .catch(next);
});


//RETURN THE COORDINATOR INFORMATION BY ID
router.get('/:id', (req, res, next) => {
  Person.findOne({
    where: { Person_Id: req.params.id },
    attributes: ['First_Nm', 'Last_Nm', 'Addr_Street_Ln1', 'Addr_Street_Ln2', 'Addr_City_Nm', 'Addr_State_Cd',
      'Addr_Postal_Cd', 'Addr_Postal4_Cd', 'Email_Txt', 'Work_Phone_Area_Cd', 'Work_Phone_Exchange_Cd',
      'Work_Phone_Local_Cd', 'Cell_Phone_Area_Cd', 'Cell_Phone_Exchange_Cd', 'Cell_Phone_Local_Cd'],
  })
    .then((result) => res.status(200).send(result))
    .catch(next);
});

//ADD NEW COORDINATOR INFORMATION
router.post('/', (req, res, next) => {
  const data = req.body;
  let dateTimeOffset = moment().format('YYYY-MM-DD HH:mm:ss');
  Person.create(
    {
      First_Nm: data.firstName,
      Last_Nm: data.lastName,
      Email_Txt: data.email,
      Addr_Street_Ln1: data.address1,
      Addr_Street_Ln2: data.address2,
      Addr_City_Nm: data.cityName,
      Addr_State_Cd: data.stateCd,
      Created_By_Nm:"Niftit",
      Created_On_DtTm: new Date().toISOString()
    })
    .then((result) => res.status(200).send(result))
    .catch(next);
});

//EDIT THE COORDINATOR INFORMATION
router.put('/:id', (req, res, next) => {
  const data = req.body;
  Person.update(
    {
      First_Nm: data.firstName,
      Last_Nm: data.lastName,
      Email_Txt: data.email,
      Addr_Street_Ln1: data.address1,
      Addr_Street_Ln2: data.address2,
      Addr_City_Nm: data.cityName,
      Addr_State_Cd: data.stateCd,
      Modified_On_DtTm: new Date().toISOString()
    },
    {
    where: { Person_Id: req.params.id }
  })
    .then((result) => res.status(200).send(result))
    .catch(next);
});


//UPDATE THE COORDINATOR IN STATE
router.put('/:stateId/assign', (req, res, next) => {
  const data = req.body;
  State.update(
    {
      Coordinator_Person_Id: data.coordinatorPersonId,
      Modified_On_DtTm: new Date().toISOString()
    },
    {
    where: { State_Cd: req.params.stateId }
  })
    .then((result) => res.status(200).send(result))
    .catch(next);
});

module.exports = router;