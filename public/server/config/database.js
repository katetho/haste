"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Connect to DB
const sequelize_typescript_1 = require("sequelize-typescript");
exports.db = new sequelize_typescript_1.Sequelize('mysql://b815ccf5030b93:868175ea@eu-cdbr-west-03.cleardb.net/heroku_92b0692982f5285', {
    pool: {
        max: 5,
        min: 0,
        acquire: 1000000,
        idle: 40000
    }
});
//# sourceMappingURL=database.js.map