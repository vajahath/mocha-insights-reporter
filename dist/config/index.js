"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// determine configurations
const lme = require("lme");
const rootPath = require("app-root-path");
const default_config_1 = require("./default-config");
let user_conf = {};
try {
    user_conf = rootPath.require('insights_config.json');
}
catch (e) {
    // no problem if nothing is provided
    lme.i('using default configs');
}
// merge configs
const config = Object.assign({}, default_config_1.default, user_conf);
exports.default = config;
//# sourceMappingURL=index.js.map