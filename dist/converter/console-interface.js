"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Listr = require("listr");
const Promise = require("bluebird");
let allTasks;
function makeTasks(files) {
    let tasks = [];
    let final = [];
    files.forEach(file => {
        tasks.push({
            title: file,
            task: () => {
                return new Promise((resolve, reject) => {
                    final.push({ resolve, reject });
                });
            }
        });
    });
    allTasks = new Listr(tasks);
    allTasks.run().catch(err => {
        console.error(err);
    });
    return final;
}
exports.makeTasks = makeTasks;
//# sourceMappingURL=console-interface.js.map