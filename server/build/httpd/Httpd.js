"use strict";
const rxjs_1 = require("rxjs");
const express = require("express");
const body_parser_1 = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const method = require("method-override");
const AComponent_1 = require("../components/AComponent");
const logger_1 = require("./middlewares/logger");
class Httpd extends AComponent_1.AComponent {
    constructor() {
        super();
        this.httpd = express();
    }
    initialize() {
        return rxjs_1.Observable.create((observer) => {
            this.httpd
                .use(method())
                .use(cors())
                .use(helmet())
                .use(compression())
                .use(body_parser_1.json())
                .use(body_parser_1.urlencoded({ extended: true }))
                .use(logger_1.logger);
            let routes = [
                'announcement',
                'group',
                'user',
                'auth'
            ];
            for (const route of routes) {
                this.httpd.use('/api', require(`./routes/${route}`).default);
            }
            try {
                this.httpd.listen(process.env.PORT || 80, observer.complete.bind(observer));
            }
            catch (error) {
                observer.error(error);
            }
        });
    }
}
exports.Httpd = Httpd;
