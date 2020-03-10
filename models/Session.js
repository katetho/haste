const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },

  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
});

Session.belongsTo(User);

//Session.sync();

module.exports = Session;
