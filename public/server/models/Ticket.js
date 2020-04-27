"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const database_1 = require("../config/database");
const sequelize_2 = require("sequelize");
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
    },
    assigneeID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    },
    initiatorId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED
    }
}, {
    scopes: {
        active: {
            where: {
                status: {
                    [sequelize_2.Op.or]: ['active', 'assigned', 'unassigned']
                }
            }
        },
        assigned: {
            where: {
                status: 'assigned'
            }
        },
        unassigned: {
            where: {
                status: 'unassigned'
            }
        },
        closed: {
            where: {
                status: 'closed'
            }
        }
    },
    sequelize: database_1.db,
    tableName: 'tickets'
});
Ticket.belongsTo(User_1.User, {
    foreignKey: 'initiatorId'
});
Ticket.belongsTo(User_1.User, {
    foreignKey: 'assigneeID'
});
Ticket.sync(); //create if not created
//# sourceMappingURL=Ticket.js.map