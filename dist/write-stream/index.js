"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const file_namer_1 = require("./file-namer");
exports.filename = file_namer_1.default;
exports.writeStream = fs.createWriteStream(file_namer_1.default);
//# sourceMappingURL=index.js.map