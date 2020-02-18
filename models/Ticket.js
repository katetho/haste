const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
	title: {
	type: String,
	required: true
},
	department: {
		type: String,
		required: true
	},
	priority: {
		type: String,
		required: true
	},
	deadline: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	assignee: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Tickets', TicketSchema);
