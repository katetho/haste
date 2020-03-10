//Connect to DB
const Sequelize = require('sequelize');
 const db = new Sequelize('haste', 'root', '2020', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: 0, //false

  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle: 10000
  },
})


module.exports = db
