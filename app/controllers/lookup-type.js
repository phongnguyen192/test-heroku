'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { LookupType } = require('../../sequelize');

// RETURNS ALL LOOKUPTYPE IN THE DATABASE
router.get('/', (req, res, next) => {
    LookupType.findAll(
        {
            where: { Active_Yn: true },
            attributes: ['Lkp_Type_Id', 'Category_Cd', 'Lkp_Type_Cd', 'Lkp_Type_Nm', 'Lkp_Type_Txt'],
        })
        .then((result) => {
            var tempData = _.groupBy(result, function (e) {
                return e.Category_Cd
            })
            res.status(200).send(tempData)
        })
        .catch(next);
});


//RETURN THE LOOKUPTYPE INFORMATION BY Category_Cd
router.get('/:id', (req, res, next) => {
    LookupType.findAll({
        where: { Category_Cd: req.params.id },
        attributes: ['Lkp_Type_Id', 'Category_Cd', 'Lkp_Type_Cd', 'Lkp_Type_Nm', 'Lkp_Type_Txt'],
    })
        .then((result) => res.status(200).send(result))
        .catch(next);
});



module.exports = router;