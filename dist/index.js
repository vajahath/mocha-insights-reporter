"use strict";
/**
 * Module dependencies.
 */
const mocha = require("mocha");
const fs = require("fs");
const chalk = require("chalk");
const write_stream_1 = require("./write-stream");
const config_1 = require("./config");
const COMA_REPLACE = config_1.default.coma_replacer;
// store fields
const fields = {
    fields: []
};
let fixer = '[';
/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @api private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
    addField(test.fullTitle());
    return {
        file: write_stream_1.filename,
        title: test.fullTitle().replace(/,/g, COMA_REPLACE),
        duration: test.duration
    };
}
// populate fields array
function addField(item) {
    item = item.replace(/,/g, COMA_REPLACE);
    fields.fields.push(item);
}
function duplicationCheck() {
    // check if the arry has duplicate test names
    fields.fields.sort();
    let results = [];
    for (let i = 0; i < fields.fields.length - 1; i++) {
        if (fields.fields[i + 1] == fields.fields[i]) {
            results.push(fields.fields[i]);
        }
    }
    if (results.length != 0) {
        console.log('\n' + chalk.red('MOCHA-INSIGHTS ERR:'));
        console.log('Duplicate test titles found.\nSo ignoring this test for analysis.\nsee below for duplicates..');
        console.log('-----------------------------------');
        results.forEach(function (item) {
            console.log(chalk.red('>') + ' ' + item);
        });
        console.log('\n');
        // delete the log file
        fs.unlinkSync(write_stream_1.filename);
    }
    else {
        console.log(chalk.cyan('\u2713') + chalk.gray(' mocha-insights log generated') + '\n');
    }
}
module.exports = function insightsReporter(runner) {
    mocha.reporters.Base.call(this, runner);
    // runner.on('test end', function(test) {
    // 	tests.push(test);
    // });
    runner.on('pass', function (test) {
        // passes.push(test);
        write_stream_1.writeStream.write(fixer + JSON.stringify(clean(test), null, 2));
        if (fixer != ', ') {
            fixer = ', ';
        }
    });
    // runner.on('fail', function(test) {
    // 	failures.push(test);
    // });
    // runner.on('pending', function(test) {
    // 	pending.push(test);
    // });
    runner.on('end', function () {
        write_stream_1.writeStream.write(']');
        write_stream_1.writeStream.end();
        duplicationCheck();
    });
};
//# sourceMappingURL=index.js.map