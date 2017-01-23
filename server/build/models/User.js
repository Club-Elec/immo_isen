"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Sequelize = require("sequelize");
const connection_1 = require("./connection");
const bcrypt_1 = require("bcrypt");
function generateHash(password, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        if (salt == null) {
            salt = yield bcrypt_1.genSalt(Math.random() % 1024);
        }
        let hash = yield bcrypt_1.hash(password, salt);
        return {
            salt,
            hash
        };
    });
}
exports.generateHash = generateHash;
exports.User = connection_1.connection.define('user', {
    mail: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    phone: Sequelize.STRING,
    salt: Sequelize.STRING,
    hash: Sequelize.STRING
}, {
    freezeTableName: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat'
});
