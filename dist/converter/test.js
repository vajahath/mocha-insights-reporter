"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_interface_1 = require("./console-interface");
const pro = console_interface_1.makeTasks(['hello', 'from']);
let i = 0;
setInterval(() => {
    pro[i].resolve();
    i++;
}, 3000);
//# sourceMappingURL=test.js.map