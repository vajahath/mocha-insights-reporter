"use strict";
// create directory structure and export that path
Object.defineProperty(exports, "__esModule", { value: true });
const mkdirp = require("mkdirp");
const config_1 = require("./../config");
const env = process.env.NODE_ENV || 'default_env';
// directory path
const path = config_1.default.folder_name + '/logs/' + env + '/';
// make directory sync.ly
mkdirp.sync(path);
exports.default = path;
//# sourceMappingURL=directory-maker.js.map