const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	firstName: {
	type: String,
	required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	department: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: "member"
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Users', UserSchema);
