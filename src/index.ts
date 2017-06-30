/**
 * Module dependencies.
 */
import * as mocha from 'mocha';
import * as lme from 'lme';
import * as fs from 'fs';
import * as chalk from 'chalk';

import { filename, writeStream } from './write-stream';
import conf from './config';

const COMA_REPLACE = conf.coma_replacer;

// store fields
const fields: any = {
	fields: []
};

let fixer = '[';

export = function insightsReporter(runner: any) {
	mocha.reporters.Base.call(this, runner);

	// runner.on('test end', function(test) {
	// 	tests.push(test);
	// });

	runner.on('pass', function (test: object) {
		// passes.push(test);
		writeStream.write(fixer + JSON.stringify(clean(test), null, 2));
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
		writeStream.write(']');
		writeStream.end();
		lme.i('processing...');
		duplicationCheck();
	});
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @api private
 * @param {Object} test
 * @return {Object}
 */
function clean(test: any) {
	addField(test.fullTitle());
	return {
		file: filename,
		title: test.fullTitle().replace(/,/g, COMA_REPLACE),
		duration: test.duration
	};
}

// populate fields array
function addField(item: string) {
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
		console.log('\n\n' + chalk.red('MOCHA-INSIGHTS ERR:'));
		console.log('Duplicate test titles found. So ignoring this test for analysis: see below for duplicates..');
		console.log('--------------------------------');
		results.forEach(function (item) {
			lme.d(item);
		});

		// delete the log file
		fs.unlinkSync(filename);

	} else {
		console.log('\n' + chalk.cyan('\u2713') + chalk.gray(' mocha-insights log generated'))
	}
}
