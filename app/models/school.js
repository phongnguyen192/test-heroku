'use strict';
module.exports = function(sequelize, Sequelize) {
    const School = sequelize.define('School', {
        School_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        State_Cd: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false,
            validate: { len: [0,2] },

        },
        Status_Lkp_Type_Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true
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
            type: Sequelize.STRING,
            validate: { len: [0,5] }
        },
        Addr_Postal4_Cd: {
            type: Sequelize.STRING,
            validate: { len: [0,4] }
        },
        School_Type_Lkp_Type_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        School_Type_Other_Nm: {
            type: Sequelize.STRING,
        },
        District_Nm: {
            type: Sequelize.STRING,
        },
        Setting_Lkp_Type_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        NCESID_Cd: {
            type: Sequelize.STRING,
            validate: { len: [0,20] }
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
    
    return School;
 }