'use strict';
module.exports = function(sequelize, Sequelize) {
    const State = sequelize.define('State', {
        State_Cd: {
            primaryKey: true,
            type: Sequelize.STRING,
        },
        State_Nm: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        Coordinator_Person_Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        Created_By_Nm: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        Created_On_DtTm: {
            type: Sequelize.DATE,
            allowNull: false,
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
 
    return State;
 }