"use strict";
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
exports.UserGroup = connection_1.connection.define('user_group', {
    mail: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    gid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
});
