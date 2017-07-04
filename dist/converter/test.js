"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_interface_1 = require("./console-interface");
const pro = console_interface_1.makeTasks(['hello', 'from']);
// console.log();
const bar = console_interface_1.makeProgress('chumma', 20);
let i = 0;
setInterval(() => {
    pro[i].resolve();
    bar.tick();
    i++;
}, 1000);
//# sourceMappingURL=test.js.map