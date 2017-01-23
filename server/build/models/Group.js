"use strict";
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
var EGroup;
(function (EGroup) {
    EGroup[EGroup["USER"] = 1] = "USER";
    EGroup[EGroup["ADMIN"] = 2] = "ADMIN";
})(EGroup = exports.EGroup || (exports.EGroup = {}));
exports.Group = connection_1.connection.define('group', {
    gid: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
});
