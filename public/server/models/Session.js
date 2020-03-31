"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = require("./User");
const database_1 = require("../config/database");
class Session extends sequelize_1.Model {
}
exports.Session = Session;
Session.init({
    sid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    expires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    data: {
        type: sequelize_1.DataTypes.STRING(1024)
    }
}, {
    sequelize: database_1.db,
    tableName: 'sessions'
});
Session.belongsTo(User_1.User);
//# sourceMappingURL=Session.js.map