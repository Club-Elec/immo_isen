"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require("jsonwebtoken");
const User_1 = require("../../models/User");
function authenticationJwt(request, response, next) {
    let { authorization } = request.headers;
    if (!/^JWT [\w\d\.\-_]+$/.test(authorization)) {
        response
            .status(401)
            .json({
            error: 'Wrong authorization'
        });
        return;
    }
    let options = {
        algorithms: ['HS256', 'HS358', 'HS512'],
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
        ignoreExpiration: false,
        clockTolerance: 0
    };
    authorization = authorization.substr(4);
    jwt.verify(authorization, process.env.JWT_SECRET, options, (error, payload) => {
        if (error) {
            return response
                .status(500)
                .json({
                error: error.message
            });
        }
        if (Date.now() >= payload.expirationAt) {
            return response
                .status(401)
                .json({
                error: 'Expiration date'
            });
        }
        request.payload = payload;
        next();
    });
}
exports.authenticationJwt = authenticationJwt;
function authenticationLocal(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mail, password } = request.body;
        if (!mail || !password) {
            response
                .status(401)
                .json({
                error: 'Wrong identifier'
            });
            return;
        }
        try {
            let user = yield User_1.User.findOne({ where: { mail } });
            let { hash } = yield User_1.generateHash(password, user.get('salt'));
            if (user.get('hash') !== hash) {
                response
                    .status(401)
                    .json({
                    error: 'Password is invalid'
                });
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
exports.authenticationLocal = authenticationLocal;
