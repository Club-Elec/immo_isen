"use strict";
const Logger_1 = require("../../components/Logger");
function logger(request, response, next) {
    const start = Date.now();
    response.addListener('finish', function () {
        const { method, httpVersion, protocol, url } = request;
        const { statusCode } = response;
        const end = Date.now();
        const logger = Logger_1.Logger.getLogger();
        logger.silly(`${protocol.toUpperCase()} ${httpVersion} ${method.toUpperCase()} ${statusCode} - ${url} - ${end - start} ms`);
    });
    next();
}
exports.logger = logger;
