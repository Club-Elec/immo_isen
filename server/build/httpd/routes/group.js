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
const Group_1 = require("../../models/Group");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.Router();
router
    .route('/group')
    .all(authentication_1.authenticationJwt)
    .get(function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let groups = yield Group_1.Group.findAll();
            response.json({ groups });
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
