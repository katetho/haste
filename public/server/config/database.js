"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Connect to DB
const sequelize_typescript_1 = require("sequelize-typescript");
exports.db = new sequelize_typescript_1.Sequelize('haste', 'root', process.env.MYSQL_PASSWORD, {
    host: '192.168.99.100',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
exports.db.addModels(['../models/Session.ts', '../models/User.ts', '../models/Ticket.ts']);
const db = new sequelize_typescript_1.Sequelize('mysql://root:2020@192.168.99.100:3306/haste');
//# sourceMappingURL=database.js.map