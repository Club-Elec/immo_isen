"use strict";
const cluster_1 = require("cluster");
const os_1 = require("os");
const joi_1 = require("joi");
const main_1 = require("./main");
const Logger_1 = require("./components/Logger");
const Configuration_1 = require("./models/Configuration");
const logger = Logger_1.Logger.getLogger();
if (cluster_1.isMaster) {
    function registerWorkerEvent(worker) {
        worker.addListener('disconnect', function () {
            logger.info(`Worker ${worker.id} has disconnected`);
        });
        worker.addListener('error', function (code, signal) {
            if (code) {
                logger.error(`Worker ${worker.id} has exited with code ${code}`);
            }
            else {
                logger.error(`Worker ${worker.id} has exited with signal ${signal}`);
            }
        });
        worker.addListener('exit', function (code, signal) {
            if (code) {
                logger.error(`Worker ${worker.id} has exited with code ${code}`);
            }
            else {
                logger.error(`Worker ${worker.id} has exited with signal ${signal}`);
            }
        });
        worker.addListener('listening', function (address) {
            logger.info(`Worker ${worker.id} is listening at ${address.port}`);
        });
        worker.addListener('message', function (message, handle) {
            logger.info(`Worker ${worker.id} receive a message`);
        });
        worker.addListener('online', function () {
            logger.info(`Worker ${worker.id} is online`);
        });
    }
    joi_1.validate(process.env, Configuration_1.Configuration, { allowUnknown: true }, (error, env) => {
        if (error) {
            logger.error(error.message);
            return;
        }
        for (let i = 0, n = os_1.cpus().length; i < n; ++i) {
            registerWorkerEvent(cluster_1.fork());
        }
    });
}
else {
    const start = Date.now();
    const main$ = main_1.main();
    main$.subscribe({
        error(error) {
            logger.error(error.message);
        },
        complete() {
            let end = Date.now();
            logger.info(`Application start in ${end - start} ms`);
        }
    });
}
