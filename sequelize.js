'use strict';
const Sequelize = require('sequelize');
const OperatorsAliases = Sequelize.Op;
const { SurveyPeriodModel, SchoolModel,
    LookupTypeModel, PersonModel,
    ProgramMAModel, ProgramModel,
    ProgramPersonModel } = require('./app/models');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            freezeTableName: true,
            encrypt: true,
        }
    },
    define: {
        charset: 'utf8',
        timestamps: false,
        freezeTableName: true,
    }
});

const Person = PersonModel(sequelize, Sequelize);
const School = SchoolModel(sequelize, Sequelize);
const Program = ProgramModel(sequelize, Sequelize);
const ProgramMA = ProgramMAModel(sequelize, Sequelize);
const ProgramPerson = ProgramPersonModel(sequelize, Sequelize);
const SurveyPeriod = SurveyPeriodModel(sequelize, Sequelize);
const LookupType = LookupTypeModel(sequelize, Sequelize);

SurveyPeriod.hasMany(Program, {
    foreignKey: 'Survey_Period_Id'
});

Program.belongsTo(SurveyPeriod, {
    foreignKey: 'Survey_Period_Id'
})

School.hasMany(Program, {
    foreignKey: 'School_Id'
});

School.belongsTo(LookupType, {
    foreignKey: 'School_Type_Lkp_Type_Id'
})

Program.belongsTo(School, {
    foreignKey: 'School_Id'
})

Program.belongsTo(Person, {
    foreignKey: 'Principal_Person_Id'
});

Program.belongsTo(Person, {
    foreignKey: 'Superintendent_Person_Id'
});

Program.belongsToMany(Person, {
    through: { model: ProgramPerson, unique: false },
    foreignKey: 'Program_Id',
});

Person.belongsToMany(Program, {
    through: { model: ProgramPerson, unique: false },
    foreignKey: 'Person_Id',
});

Program.belongsToMany(LookupType, {
    through: { model: ProgramMA, unique: false },
    foreignKey: 'Program_Id',
});

LookupType.belongsToMany(Program, {
    through: { model: ProgramMA, unique: false },
    foreignKey: 'Lkp_Type_Id',
});



module.exports = {
    Person,
    School,
    Program,
    ProgramMA,
    ProgramPerson,
    SurveyPeriod,
    LookupType,
    Sequelize,
    OperatorsAliases
}