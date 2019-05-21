'use strict';
const express = require('express');
const router = express.Router();
const { State, School, Season, Person, Program, ProgramPerson } = require('../../sequelize');

// RETURNS ALL THE SCHOOLS IN THE STATES
router.get('/coordinator', (req, res, next) => {
    State.findAll({
        where: {State_Cd: 'NY'},
        attributes: ['State_Nm', 'State_Cd'],
        order: [
            ['State_Nm', 'ASC'],
        ],
        include: [{
            model: School,
            attributes:['School_Id', 'Addr_Street_Ln1', 'Addr_Street_Ln2'],
            include: [{
                model: Program,
                attributes:['Program_Id'],
                include: [{
                    model: ProgramPerson,
                    attributes: ['Program_Id', 'Person_Id', 'Main_POC_Yn'],
                    include: [{
                        model: Person,
                        attributes:['First_Nm', 'Last_Nm', 'Email_Txt'],
                    }]
                }]
            }]
            // attributes: ['First_Nm', 'Last_Nm', 'Addr_City_Nm', 'Email_Txt'],
            // required: true
        }]
    })
        .then((result) => {
            const data = []; 
             result[0].Schools.forEach(element => {
                 const tempObj = {};
                 tempObj.Addr_Street_Ln1 = element.Addr_Street_Ln1;
                 tempObj.Addr_Street_Ln2 = element.Addr_Street_Ln2;
                if(element.Programs.length != 0){
                    element.Programs[0].Program_People.forEach(item => {
                        if(item.Main_POC_Yn === true){
                            tempObj.First_Nm = item.Person.First_Nm;
                            tempObj.Last_Nm = item.Person.Last_Nm;
                            tempObj.Email_Txt = item.Person.Email_Txt;
                            data.push(tempObj)
                        }
                        console.log(item);
                    });
                }
            });
        
            res.status(200).send(result);
        })
        .catch(next);
});

//RETURN A LIST OF THE PROGRAMS  
router.get('/', (req, res, next) => {
    Season.findAll({
    //   attributes: ['State_Nm', 'State_Cd'],
      order: [
        ['Created_On_DtTm', 'DESC'],
      ],
      include: [{
        model: Program,
        // attributes: ['First_Nm', 'Last_Nm', 'Addr_City_Nm', 'Email_Txt'],
        required: true
      }]
    })
      .then((result) => res.status(200).send(result))
      .catch(next);
  });
  

module.exports = router;