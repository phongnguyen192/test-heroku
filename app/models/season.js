'use strict';
module.exports = function(sequelize, Sequelize) {
    const Season = sequelize.define('Season', {
        Season_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        Season_Cd: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        Season_Nm: {
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        Start_Dr: {
            type: Sequelize.DATE,
            allowNull: false,
            notEmpty: true
        },
        End_Dt: {
            type: Sequelize.DATE,
            allowNull: false,
            notEmpty: true
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

    return Season;
 }