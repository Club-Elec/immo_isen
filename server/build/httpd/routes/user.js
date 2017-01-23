"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express_1 = require("express");
const User_1 = require("../../models/User");
const UserGroup_1 = require("../../models/UserGroup");
const authentication_1 = require("../middlewares/authentication");
const restrict_1 = require("../middlewares/restrict");
const Announcement_1 = require("../../models/Announcement");
const router = express_1.Router();
router
    .route('/user')
    .all(authentication_1.authenticationJwt)
    .get(restrict_1.restrictToAdmin, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let users = yield User_1.User.findAll();
            response.json({ users });
        }
        catch (error) {
            response
                .status(500)
                .json({
                error: error.message
            });
        }
    });
})
    .post(function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mail, password, phone, firstname, lastname } = request.body;
            const { salt, hash } = yield User_1.generateHash(password);
            let user = yield User_1.User.create({
                mail,
                firstname,
                lastname,
                phone,
                salt,
                hash
            });
            yield UserGroup_1.UserGroup.create({
                gid: 1,
                mail
            });
            response
                .status(201)
                .json({ user });
        }
        catch (error) {
            response
                .status(500)
                .json({
                error: error.message
            });
        }
    });
});
router
    .route('/user/:mail')
    .all(authentication_1.authenticationJwt)
    .get(restrict_1.restrictToOwner, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mail } = request.params;
            let user = yield User_1.User.findOne({ where: { mail } });
            response.json({ user });
        }
        catch (error) {
            response
                .status(500)
                .json({ error: error.message });
        }
    });
})
    .put(restrict_1.restrictToOwner, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mail } = request.params;
            const { password, phone, firstname, lastname } = request.body;
            let user = yield User_1.User.findOne({ where: { mail } });
            let { salt, hash } = yield User_1.generateHash(password, user.get('salt'));
            yield User_1.User.update({
                firstname,
                lastname,
                phone,
                salt,
                hash
            }, {
                where: { mail }
            });
            user = yield User_1.User.findOne({ where: { mail } });
            response.json({ user });
        }
        catch (error) {
            response
                .status(500)
                .json({ error: error.message });
        }
    });
})
    .delete(restrict_1.restrictToOwner, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { mail } = request.params;
            yield UserGroup_1.UserGroup.destroy({ where: { mail } });
            yield Announcement_1.Announcement.destroy({ where: { mail } });
            yield User_1.User.destroy({ where: { mail } });
            response
                .status(200)
                .end();
        }
        catch (error) {
            response
                .status(500)
                .json({ error: error.message });
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
