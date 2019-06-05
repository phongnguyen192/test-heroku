'use strict';
module.exports = function(sequelize, Sequelize) {
    const School = sequelize.define('School', {
        School_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        CR_Company_Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        Status_Lkp_Type_Id: {
            type: Sequelize.INTEGER,
        },
        School_Type_Lkp_Type_Id: {
            type: Sequelize.INTEGER,
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