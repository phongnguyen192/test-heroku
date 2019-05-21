'use strict';
module.exports = function(sequelize, Sequelize) {
    const ProgramPerson = sequelize.define('Program_Person', {
        Program_Person_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        Person_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Program_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Main_POC_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Registered_CR_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Fall_Class_Qty: {
            type: Sequelize.INTEGER,
        },
        Spring_Class_Qty: {
            type: Sequelize.INTEGER,
        },
        Summer_Inst_Level1_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Summer_Inst_Level2_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Summer_Inst_Level3_Yn: {
            type: Sequelize.BOOLEAN,
        },
        CFSE_Certification_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Created_By_Nm: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        Created_On_DtTm: {
            type: Sequelize.DATE,
            notEmpty: true
        },
        Modified_By_Nm: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        Modified_On_DtTm: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    });
 
    return ProgramPerson;
 }