"use strict";
const winston = require("winston");
const cluster_1 = require("cluster");
class Logger extends winston.Logger {
    constructor(options) {
        super(options);
    }
    static getLogger() {
        if (!(Logger.instance instanceof Logger)) {
            const { Console } = winston.transports;
            Logger.instance = new Logger();
            Logger.instance.add(Console, {
                level: 'silly',
                colorize: true,
                timestamp: true,
                prettyPrint: true
            });
            Logger.instance.filters = [
                function (level, message) {
                    let prefix;
                    if (cluster_1.isMaster) {
                        prefix = 'master';
                    }
                    else {
                        prefix = `worker-${cluster_1.worker.id}`;
                    }
                    return `[${prefix}] ${message}`;
                }
            ];
        }
        return Logger.instance;
    }
}
exports.Logger = Logger;
