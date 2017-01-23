"use strict";
const AsyncQueueManager_1 = require("./components/AsyncQueueManager");
const Httpd_1 = require("./httpd/Httpd");
function main() {
    const manager = new AsyncQueueManager_1.AsyncQueueManager();
    manager
        .register(new Httpd_1.Httpd());
    return manager.initialize();
}
exports.main = main;
