const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Ticket = db.define('ticket', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    priority: {
        type: Sequelize.STRING
    },
    deadline: {
        type: Sequelize.DATE
    },
    description: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    assignee: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'unassigned'
    }
}, {
    timestamps: false
})

Ticket.belongsTo(User, {
    foreignKey: {
        name: 'initiatorId'
    }
});
Ticket.belongsTo(User, {
    foreignKey: {
        name: 'assigneeID'
    }
});

Ticket.sync(); //create if not created

module.exports = Ticket;
