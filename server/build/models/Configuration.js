"use strict";
const joi_1 = require("joi");
exports.Configuration = joi_1.object().keys({
    PORT: joi_1.number(),
    JWT_ISSUER: joi_1.string().required(),
    JWT_AUDIENCE: joi_1.string().required(),
    JWT_SECRET: joi_1.string().required()
});
