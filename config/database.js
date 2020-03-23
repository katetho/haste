//Connect to DB
const Sequelize = require('sequelize');
 const db = new Sequelize('hasteDB', 'root', process.env.MYSQL_PASSWORD, {
  host: 'db',
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
