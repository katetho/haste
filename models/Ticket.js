const Sequelize = require('sequelize');
const db = require('../config/database');

const Ticket = db.define('ticket', {
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title:{
		type: Sequelize.STRING
	},
	department:{
		type: Sequelize.STRING
	},
	priority:{
		type: Sequelize.STRING
	},
	deadline:{
		type: Sequelize.DATE
	},
	description:{
		type: Sequelize.STRING
	},
	date:{
		type: Sequelize.DATE
	},
	assignee:{
		type: Sequelize.STRING
	},
	assigneeID:{
		type: Sequelize.STRING
	},
	status:{
		type: Sequelize.STRING,
		defaultValue: 'unassigned'
	},
	initiator:{
		type: Sequelize.STRING
	},
}, {
    timestamps: false
  })

Ticket.sync(); //create if not created

module.exports = Ticket;
