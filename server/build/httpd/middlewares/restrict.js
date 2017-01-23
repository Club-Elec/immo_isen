"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UserGroup_1 = require("../../models/UserGroup");
const Announcement_1 = require("../../models/Announcement");
function restrictToAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sub } = request.payload;
        try {
            let admin = yield UserGroup_1.UserGroup.findOne({ where: { mail: sub, gid: 2 } });
            if (!admin) {
                response
                    .status(401)
                    .end();
                return;
            }
            next();
        }
        catch (error) {
            response
                .status(500)
                .json({
                error: error.message
            });
        }
    });
}
exports.restrictToAdmin = restrictToAdmin;
function restrictToOwner(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sub } = request.payload;
        let mail = request.body.mail || request.params.mail;
        try {
            if (!mail && request.params.aid) {
                let announcement = yield Announcement_1.Announcement.findOne({ where: { aid: request.params.aid } });
                mail = announcement.get('mail');
            }
            if (mail === sub) {
                return next();
            }
            let admin = yield UserGroup_1.UserGroup.findOne({ where: { mail: sub, gid: 2 } });
            if (!admin) {
                response
                    .status(401)
                    .end();
                return;
            }
            next();
        }
        catch (error) {
            response
                .status(500)
                .json({
                error: error.message
            });
        }
    });
}
exports.restrictToOwner = restrictToOwner;
