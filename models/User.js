const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
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

module.exports = User;
