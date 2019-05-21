'use strict';
const express = require('express');
const router = express.Router();
const { State, School, Person, Program, ProgramPerson } = require('../../sequelize');

// RETURNS ALL THE SCHOOLS IN THE STATES
router.get('/', (req, res, next) => {
    State.findAll({
        attributes: ['State_Nm', 'State_Cd'],
        order: [
            ['State_Nm', 'ASC'],
        ],
        include: [{
            model: School,
            // attributes: ['First_Nm', 'Last_Nm', 'Addr_City_Nm', 'Email_Txt'],
            // required: true
        }]
    })
        .then((result) => res.status(200).send(result))
        .catch(next);
});

//RETURN THE SCHOOL INFORMATION BY ID
router.get('/:id', (req, res, next) => {
    School.findOne({
        where: { School_Id: req.params.id },
        // attributes: ['Person_Id'],
    })
        .then((result) => res.status(200).send(result))
        .catch(next);
});

//ADD NEW SCHOOL INFORMATION
router.post('/', (req, res, next) => {
    const data = req.body;
    School.create(
        {
            State_Cd: data.State_Cd,
            Status_Lkp_Type_Id: data.Status_Lkp_Type_Id,
            Addr_City_Nm: data.Addr_City_Nm,
            Addr_Street_Ln1: data.Addr_Street_Ln1,
            Addr_Street_Ln2: data.Addr_Street_Ln2,
            Addr_State_Cd: data.Addr_State_Cd,
            Addr_Postal_Cd: data.Addr_Postal_Cd,
            Addr_Postal4_Cd: data.Addr_Postal4_Cd,
            School_Type_Lkp_Type_Id: data.School_Type_Lkp_Type_Id,
            School_Type_Other_Nm: data.School_Type_Other_Nm,
            District_Nm: data.District_Nm,
            Setting_Lkp_Type_Id: data.Setting_Lkp_Type_Id,
            NCESID_Cd: data.NCESID_Cd,
            Created_By_Nm: "Niftit",
            Created_On_DtTm: new Date().toISOString()
        })
        .then((result) => res.status(200).send(result))
        .catch(next);
});

//EDIT THE SCHOOL INFORMATION
router.put('/:id', (req, res, next) => {
    const data = req.body;
    School.update(
        {
            State_Cd: data.State_Cd,
            Status_Lkp_Type_Id: data.Status_Lkp_Type_Id,
            Addr_City_Nm: data.Addr_City_Nm,
            Addr_Street_Ln1: data.Addr_Street_Ln1,
            Addr_Street_Ln2: data.Addr_Street_Ln2,
            Addr_State_Cd: data.Addr_State_Cd,
            Addr_Postal_Cd: data.Addr_Postal_Cd,
            Addr_Postal4_Cd: data.Addr_Postal4_Cd,
            School_Type_Lkp_Type_Id: data.School_Type_Lkp_Type_Id,
            School_Type_Other_Nm: data.School_Type_Other_Nm,
            District_Nm: data.District_Nm,
            Setting_Lkp_Type_Id: data.Setting_Lkp_Type_Id,
            NCESID_Cd: data.NCESID_Cd,
            Modified_On_DtTm: new Date().toISOString()
        },
        {
            where: { Person_Id: req.params.id }
        })
        .then((result) => res.status(200).send(result))
        .catch(next);
});


module.exports = router;