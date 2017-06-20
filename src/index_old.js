'use strict';

/**
 * Module dependencies.
 */
var mocha = require('mocha');
var fs = require('fs');
var mkdirp = require('mkdirp');
var lme = require('lme');

var conf = require('./config');

var PATH = conf.PATH;
var COMA_REPLACE = conf.coma_replacer;
var env = process.env.NODE_ENV || 'default_env'

// get fields
var fields = {
	fields: []
};

exports = module.exports = insightsReporter;

// var fieldsStream;
var writeStream;
var fixer = '[';
var fileName = new Date();

mkdirp(PATH + '/log/' + env + '/', function(err) {
	if (err) {
		lme.e(err);
		throw (err);
	}
	writeStream = fs.createWriteStream(PATH + '/log/' + env + '/' + fileName + '.json');
});

function insightsReporter(runner) {
	mocha.reporters.Base.call(this, runner);

	// runner.on('test end', function(test) {
	// 	tests.push(test);
	// });

	runner.on('pass', function(test) {
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

	runner.on('end', function() {
		writeStream.write(']');
		writeStream.end();

		lme.i('processing...');

		// check if the arry has duplicate test names
		fields.fields.sort();

		var results = [];
		for (var i = 0; i < fields.fields.length - 1; i++) {
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
			fs.unlinkSync(PATH + '/log/' + env + '/' + fileName + '.json');

		} else {
			// fieldsStream.write(JSON.stringify(fields));
			lme.i('mocha-insights log generated');
		}

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
		file: fileName,
		title: test.fullTitle().replace(/,/g, COMA_REPLACE),
		duration: test.duration
	};
}

// populate fields array
function addField(item) {
	item = item.replace(/,/g, COMA_REPLACE);
	fields.fields.push(item);
}
