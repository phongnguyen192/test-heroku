'use strict';
const Sequelize = require('sequelize');
const OperatorsAliases  = Sequelize.Op;
const PersonModel = require('./app/models/person');
const StateModel = require('./app/models/state');
const SchoolModel = require('./app/models/school');
const SeasonModel = require('./app/models/season');
const ProgramModel = require('./app/models/program');
const ProgramPersonModel = require('./app/models/program-person');
const ProgramMAModel = require('./app/models/program-multibit-answers');

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


const State = StateModel(sequelize, Sequelize);
const Person = PersonModel(sequelize, Sequelize);
const School = SchoolModel(sequelize, Sequelize);
const Season = SeasonModel(sequelize, Sequelize);
const Program = ProgramModel(sequelize, Sequelize);
const ProgramMA = ProgramMAModel(sequelize, Sequelize);
const ProgramPerson = ProgramPersonModel(sequelize, Sequelize);



State.hasOne(Person, {
    foreignKey: 'Person_Id',
    sourceKey: 'Coordinator_Person_Id'
});

State.belongsTo(Person, {
    foreignKey: 'Coordinator_Person_Id'
});

State.hasMany(School, {
    foreignKey: 'State_Cd'
});

Season.hasMany(Program, {
    foreignKey: 'Season_Id'
});

School.hasMany(Program, {
    foreignKey: 'School_Id'
});

Person.belongsToMany(Program, {
    through: {model:ProgramPerson,unique: false},
    foreignKey: 'Person_Id',
    otherKey: 'Person_Id'
  });


Program.belongsToMany(Person, {
    through: {model:ProgramPerson,unique: false} ,
    foreignKey: 'Program_Id',
    otherKey: 'Program_Id'
  });

Program.hasMany(ProgramPerson,{
    foreignKey: 'Program_Id',
});


ProgramPerson.belongsTo(Program,{
    foreignKey:'Program_Id'
});

ProgramPerson.belongsTo(Person,{
    foreignKey:'Person_Id'
});


module.exports = {
    Person,
    State,
    Season,
    School,
    Program,
    ProgramMA,
    ProgramPerson,
    OperatorsAliases
}