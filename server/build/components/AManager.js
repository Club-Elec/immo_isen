"use strict";
const AComponent_1 = require("./AComponent");
class AManager extends AComponent_1.AComponent {
    constructor() {
        super();
        this.components = [];
    }
    register(component) {
        this.components.push(component);
        return this;
    }
}
exports.AManager = AManager;
