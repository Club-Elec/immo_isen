"use strict";
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
exports.Announcement = connection_1.connection.define('announcement', {
    aid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    mail: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    image: Sequelize.STRING
}, {
    freezeTableName: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
});
