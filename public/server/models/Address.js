"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Address extends sequelize_1.Model {
}
Address.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    },
    address: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    tableName: 'address',
    sequelize: database_1.db,
});
Address.sync();
//# sourceMappingURL=Address.js.map