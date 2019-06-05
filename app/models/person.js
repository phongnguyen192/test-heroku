'use strict';
module.exports = function(sequelize, Sequelize) {
    const Person = sequelize.define('Person', {
        Person_Id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        CR_User_Id: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        First_Nm: {
            type: Sequelize.STRING,
        },
        Last_Nm: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false,
        },
        Prefix_Cd: {
            type: Sequelize.STRING(10),
        },
        Addr_Street_Ln1: {
            type: Sequelize.STRING,
        },
        Addr_Street_Ln2: {
            type: Sequelize.STRING,
        },
        Addr_City_Nm: {
            type: Sequelize.STRING,
        },
        Addr_State_Cd: {
            type: Sequelize.STRING,
            validate: { len: [0,2] }
        },
        Addr_Postal_Cd: {
            type: Sequelize.STRING(5),
            validate: { len: [0,5] }
        },
        Addr_Postal4_Cd: {
            type: Sequelize.STRING(4),
            validate: { len: [0,4] }
        },
        Email_Txt: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        Work_Phone_Area_Cd: {
            type: Sequelize.STRING(3),
            validate: { len: [0,3] }
        },
        Work_Phone_Exchange_Cd: {
            type: Sequelize.STRING(3),
            validate: { len: [0,3] }
        },
        Work_Phone_Local_Cd: {
            type: Sequelize.STRING(4),
            validate: { len: [0,4] }
        },
        Cell_Phone_Area_Cd: {
            type: Sequelize.STRING(3),
            validate: { len: [0,3] }
        },
        Cell_Phone_Exchange_Cd: {
            type: Sequelize.STRING(3),
            validate: { len: [0,3] }
        },
        Cell_Phone_Local_Cd: {
            type: Sequelize.STRING(3),
            validate: { len: [0,4] }
        },
        Created_By_Nm: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        Created_On_DtTm: {
            type: Sequelize.DATE,
            notEmpty: true,
            allowNull: false,
        },
        Modified_By_Nm: {
            type: Sequelize.STRING,
        },
        Modified_On_DtTm: {
            type: Sequelize.DATE,
        },
    });
 
    return Person;
 }