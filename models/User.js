const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	firstName:{
		type: Sequelize.STRING
	},
	lastName:{
		type: Sequelize.STRING
	},
	email:{
		type: Sequelize.STRING
	},
	department:{
		type: Sequelize.STRING
	},
	password:{
		type: Sequelize.STRING
	},
	role:{
		type: Sequelize.STRING,
		default: 'member'
	}
}, {
    timestamps: false
  })

User.sync(); //create if not created

module.exports = User;
