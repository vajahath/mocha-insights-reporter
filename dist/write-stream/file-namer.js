"use strict";
// module to determine file name
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const username = require("username");
const directory_maker_1 = require("./directory-maker");
const gottenUsername = username.sync();
exports.default = path.join(directory_maker_1.default, gottenUsername + '-' + new Date().toJSON() + '.json');
//# sourceMappingURL=file-namer.js.map