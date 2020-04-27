"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(128)
    },
    department: {
        type: sequelize_1.DataTypes.STRING(128),
    },
    password: {
        type: sequelize_1.DataTypes.STRING(128),
    },
    role: {
        type: sequelize_1.DataTypes.STRING(128),
        defaultValue: 'member'
    }
}, {
    sequelize: database_1.db,
    tableName: 'users'
});
User.sync(); //create if not created
//# sourceMappingURL=User.js.map