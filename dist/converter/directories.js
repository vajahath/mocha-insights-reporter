"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("bluebird");
const fs = require("fs");
const path = require("path");
const rootPath = require("app-root-path");
const config_1 = require("./../config");
// place that stores logs
const logPath = path.join(rootPath + '', config_1.default.folder_name, 'logs');
exports.default = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(logPath, (err, dirs) => {
            if (err)
                reject(err);
            else
                resolve(dirs);
        });
    });
};
//# sourceMappingURL=directories.js.map