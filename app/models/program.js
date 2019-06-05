'use strict';
module.exports = function(sequelize, Sequelize) {
    const Program = sequelize.define('Program', {
        Program_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        School_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Survey_Period_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Principal_Person_Id: {
            type: Sequelize.INTEGER,
        },
        Superintendent_Person_Id: {
            type: Sequelize.INTEGER,
        },
        Student_Level1_Qty: {
            type: Sequelize.INTEGER,
        },
        Student_Level2_Qty: {
            type: Sequelize.INTEGER,
        },
        Student_Expected_Completion_Qty: {
            type: Sequelize.INTEGER,
        },
        Student_Working_Qty: {
            type: Sequelize.INTEGER,
        },
        Admission_Requirements_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Full_Capacity_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Full_Reason_Other_Txt: {
            type: Sequelize.TEXT,
        },
        Work_Exp_Opportunity_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Involvement_Other_Txt: {
            type: Sequelize.TEXT,
        },
        Fundraising_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Student_COA_Yn: {
            type: Sequelize.BOOLEAN,
        },
        High_School_Qty: {
            type: Sequelize.INTEGER,
        },
        Multi_High_School_Yn:{
            type: Sequelize.BOOLEAN,
        },
        Title1_Funding_Yn: {
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
 
    return Program;
 }