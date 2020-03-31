"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const database_1 = require("../config/database");
class Ticket extends sequelize_1.Model {
}
exports.Ticket = Ticket;
Ticket.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    department: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    priority: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(1024)
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
    },
    assignee: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    status: {
        type: sequelize_1.DataTypes.STRING(128),
        defaultValue: 'unassigned'
    }
}, {
    sequelize: database_1.db,
    tableName: 'tickets'
});
Ticket.belongsTo(User_1.User, {
    foreignKey: 'initiatorId'
});
Ticket.belongsTo(User_1.User, {
    foreignKey: 'assigneeID'
});
//Ticket.sync(); //create if not created
//# sourceMappingURL=Ticket.js.map