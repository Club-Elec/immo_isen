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
const path_1 = require("path");
const multer = require("multer");
const authentication_1 = require("../middlewares/authentication");
const restrict_1 = require("../middlewares/restrict");
const Announcement_1 = require("../../models/Announcement");
const router = express_1.Router();
const upload = multer({ dest: path_1.join(__dirname, '../../../../client/assets') });
router
    .route('/announcement')
    .get(function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let announcements = yield Announcement_1.Announcement.findAll();
            response.json({ announcements });
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
    .post(authentication_1.authenticationJwt, upload.single('image'), function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sub } = request.payload;
            const { title, description, address } = request.body;
            let announcement = yield Announcement_1.Announcement.create({
                mail: sub,
                title,
                description,
                address,
                image: `${request.file.destination}/${request.file.filename}`
            });
            response.json({ announcement });
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
    .route('/announcement/:aid')
    .get(function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { aid } = request.params;
            let announcement = yield Announcement_1.Announcement.findOne({ where: { aid } });
            response.json({
                announcement
            });
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
    .put(authentication_1.authenticationJwt, restrict_1.restrictToOwner, upload.single('image'), function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { aid } = request.params;
            const { sub } = request.payload;
            const { title, description, address } = request.body;
            yield Announcement_1.Announcement.update({
                title,
                description,
                address,
                image: `${request.file.destination}/${request.file.filename}`
            }, {
                where: { aid }
            });
            let announcement = yield Announcement_1.Announcement.findOne({ where: { aid } });
            response.json({ announcement });
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
    .delete(authentication_1.authenticationJwt, restrict_1.restrictToOwner, function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { aid } = request.params;
            let affected = yield Announcement_1.Announcement.destroy({ where: { aid } });
            response.json({
                affected
            });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
