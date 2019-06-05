'use strict';
module.exports = function(sequelize, Sequelize) {
    const LookupType = sequelize.define('Lookup_Type', {
        Lkp_Type_Id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            notEmpty: true
        },
        Category_Cd: {
            type: Sequelize.STRING,
            validate: { len: [0,20] }
        },
        Lkp_Type_Cd: {
            type: Sequelize.STRING,
            validate: { len: [0,10] },
            allowNull: false,
            notEmpty: true
        },
        Lkp_Type_Nm: {
            type: Sequelize.STRING,
            validate: { len: [0,10] },
            allowNull: false,
            notEmpty: true
        },
        Lkp_Type_Txt: {
            type: Sequelize.STRING,
            validate: { len: [0,4000] },
        },
        Active_Yn: {
            type: Sequelize.BOOLEAN,
        },
        Program_Default_Yn: {
            type: Sequelize.BOOLEAN,
        },
    });

    return LookupType;
 }