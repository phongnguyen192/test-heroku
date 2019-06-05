'use strict';
module.exports = function(sequelize, Sequelize) {
    const ProgramMA = sequelize.define('Program_Multibit_Answers', {
        PMA_Id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        Program_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Lkp_Type_Id: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        Answer_Yn: {
            type: Sequelize.BOOLEAN,
        },
    });
 
    return ProgramMA;
 }