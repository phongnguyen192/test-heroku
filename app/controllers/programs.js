'use strict';
const express = require('express');
const Promise = require('promise');
const _ = require('lodash');
const router = express.Router();
const moment = require('moment');
const role = require('../policies/role-base');
const { School, LookupType, Person, Program, SurveyPeriod } = require('../../sequelize');



//RETURN A LIST OF THE SURVEY 
router.get('/poc', role('POC'), (req, res, next) => {
    Person.findOne({
        where: { Person_Id: 1 },
        attributes: ['Person_Id'],
        include: [{
            model: Program,
            attributes: ['Program_Id', 'School_Id', 'Survey_Period_Id'],
            order: [
                ['Created_On_DtTm', 'DESC'],
            ],
            include: [{
                model: School,
                attributes: ['School_Id', 'CR_Company_Id', 'School_Type_Lkp_Type_Id'],
                include: [{
                    model: LookupType,
                    attributes: ['Lkp_Type_Nm']
                }]
            },
            {
                model: SurveyPeriod,
                attributes: ['Survey_Period_Id', 'Season_Cd', 'Season_Nm', 'Start_Dr', 'End_Dt']
            }],
        }]
    })
        .then((result) => res.status(200).send(result))
        .catch(next);
});

//RETURN SURVEY BY ID
router.get('/:id', (req, res, next) => {
    const id = Number(req.params.id)
    Program.findOne({
        where: { Program_Id: id },
        include: [{
            model: LookupType,
            where: { Active_Yn: true },
            attributes: ['Lkp_Type_Id', 'Category_Cd', 'Lkp_Type_Cd', 'Lkp_Type_Nm', 'Lkp_Type_Txt'],
        },
        {
            model: School,
            attributes: ['NCESID_Cd'],
        }
        ]
    })
        .then((result) => {
            if (result) {
                SurveyPeriod.findOne({
                    where: { Survey_Period_Id: result.Survey_Period_Id }
                }).then((re) => {
                    var now = moment();
                    var isStop = moment(re.End_Dt).isAfter(now);
                    var isStart = moment(re.Start_Dr).isBefore(now);
                    if (isStart && isStop) {
                        res.status(200).send(result);
                    } else {
                        return res.status(400).send({
                            error: {
                                code: 400,
                                message: 'This survey is currently closed. Please contact the administrator !'
                            }
                        });
                    }
                });
            } else {
                return res.status(400).send({
                    error: {
                        code: 400,
                        message: 'Item not found !'
                    }
                });
            }
        })
        .catch(next);
});

router.put('/:id', role('POC'), (req, res, next) => {
    const id = Number(req.params.id)
    const data = req.body;
    const school = { NCESID_Cd: data.School.NCESID_Cd }
    const objUpdate = {
        Student_Level1_Qty: data.Student_Level1_Qty,
        Student_Level2_Qty: data.Student_Level2_Qty,
        Student_Expected_Completion_Qty: data.Student_Expected_Completion_Qty,
        Student_Working_Qty: data.Student_Working_Qty,
        Work_Exp_Opportunity_Yn: data.Work_Exp_Opportunity_Yn,
        Involvement_Other_Txt: data.Involvement_Other_Txt,
        Admission_Requirements_Yn: data.Admission_Requirements_Yn,
        Fundraising_Yn: data.Fundraising_Yn,
        Student_COA_Yn: data.Student_COA_Yn,
        High_School_Qty: data.High_School_Qty,
        Full_Reason_Other_Txt: data.Full_Reason_Other_Txt,
        Full_Capacity_Yn: data.Full_Capacity_Yn,
        Multi_High_School_Yn: data.Multi_High_School_Yn,
        Title1_Funding_Yn: data.Title1_Funding_Yn,
        Modified_By_Nm: req.currentUser.email,
        Modified_On_DtTm: new Date().toISOString()
    };

    Program.findOne({
        where: { Program_Id: id },
        include: [
            { model: School },
            { model: LookupType }]
    }).then((result) => {
        if (result) {
            let promies = [];
            promies.push(result.update(objUpdate));
            promies.push(result.School.update(school));
            _.forEach(result.Lookup_Types, function (e) {
                _.find(data.Lookup_Types, function (r) {
                    if (r.Program_Multibit_Answers.PMA_Id == e.Program_Multibit_Answers.PMA_Id) {
                        promies.push(e.Program_Multibit_Answers.update({ Answer_Yn: r.Program_Multibit_Answers.Answer_Yn }));
                        return;
                    }
                });
            });
            Promise.all(promies).then(function () {
                res.status(200).send(result)
            });
        } else {
            return res.status(400).send({
                error: {
                    code: 400,
                    message: 'Item not found !'
                }
            });
        }
    })
        .catch(next);

});


module.exports = router;