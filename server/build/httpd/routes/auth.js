"use strict";
const express_1 = require("express");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const authentication_1 = require("../middlewares/authentication");
const router = express_1.Router();
router
    .route('/auth')
    .all(authentication_1.authenticationLocal)
    .post(function (request, response) {
    const { mail } = request.body;
    let options = {
        algorithm: 'HS512',
        expiresIn: 60 * 60 * 6,
        notBefore: '0',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        jwtid: uuid()
    };
    let payload = {
        sub: mail,
        expirationAt: Date.now() + 60 * 60 * 6 * 1000,
        creationAt: Date.now(),
    };
    jwt.sign(payload, process.env.JWT_SECRET, options, (error, token) => {
        if (error) {
            return response
                .status(500)
                .json({
                error: error.message
            });
        }
        response.json({ token });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
