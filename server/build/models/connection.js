"use strict";
const Sequelize = require("sequelize");
const Logger_1 = require("../components/Logger");
const username = process.env.POSTGRES_USERNAME || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'postgres';
const database = process.env.POSTGRES_DATABASE || 'postgres';
const host = process.env.POSTGRES_HOST || '127.0.0.1';
exports.connection = new Sequelize(database, username, password, {
    dialect: 'postgres',
    logging: Logger_1.Logger.getLogger().silly
});
