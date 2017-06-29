"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const mocha = require("mocha");
const lme = require("lme");
const fs = require("fs");
const write_stream_1 = require("./write-stream");
const config_1 = require("./config");
const COMA_REPLACE = config_1.default.coma_replacer;
// store fields
const fields = {
    fields: []
};
let fixer = '[';
function insightsReporter(runner) {
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
        lme.i('processing...');
        duplicationCheck();
    });
}
exports.default = insightsReporter;
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
        lme.e('MOCHA-INSIGHTS ERR: duplicate test titles. So ignoring this test for analysis: see below for duplicates..');
        results.forEach(function (item) {
            lme.d(item);
        });
        // delete the log file
        fs.unlinkSync(write_stream_1.filename);
    }
    else {
        lme.d('+------------------------------+');
        lme.d('| mocha-insights log generated |');
        lme.d('+------------------------------+');
    }
}
//# sourceMappingURL=index.js.map