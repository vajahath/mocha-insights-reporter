"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Listr = require("listr");
const Promise = require("bluebird");
const Progress = require("progress");
let allTasks;
let progressBar;
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
function makeProgress(dirname, total) {
    progressBar = new Progress(` > Getting Insights - ${dirname} [:bar]`, {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: total
    });
    return progressBar;
}
exports.makeProgress = makeProgress;
//# sourceMappingURL=console-interface.js.map