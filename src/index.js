/**
 * Module dependencies.
 */
const mocha = require('mocha');
const lme = require('lme');

const { filename, writeStream } = require('./write-stream');
const conf = require('./config');
const COMA_REPLACE = conf.coma_replacer;

// store fields
const fields = {
	fields: []
};

exports = module.exports = insightsReporter;

let fixer = '[';

function insightsReporter(runner) {
	mocha.reporters.Base.call(this, runner);

	// runner.on('test end', function(test) {
	// 	tests.push(test);
	// });

	runner.on('pass', function(test) {
		// passes.push(test);
		console.log("passing");
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

	runner.on('end', function() {
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
function clean(test) {
	addField(test.fullTitle());
	return {
		file: filename,
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
		results.forEach(function(item) {
			lme.d(item);
		});

		// delete the log file
		fs.unlinkSync(filename);

	} else {
		// fieldsStream.write(JSON.stringify(fields));
		lme.i('mocha-insights log generated');
	}
}
