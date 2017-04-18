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

// get fields
var fields;
try {
	fields = require(PATH + '/data/fields.json');
} catch (err) {
	fields = {
		fields: []
	}
}

exports = module.exports = pencilReporter;

var fieldsStream;
var writeStream;
var fixer = '[';
var fileName = Date.now();

mkdirp(PATH + '/data/', function(e) {
	if (e) {
		lme.e(e);
		throw (e);
		return;
	}
	fieldsStream = fs.createWriteStream(PATH + '/data/fields.json');
});

mkdirp(PATH + '/log/', function(err) {
	if (err) {
		lme.e(err);
		throw (err);
		return;
	}
	writeStream = fs.createWriteStream(PATH + '/log/' + fileName + '.json');
})

function pencilReporter(runner) {
	mocha.reporters.Base.call(this, runner);

	var self = this;
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
			lme.e("MOCHA-INSIGHTS ERR: duplicate test titles. So ignoring this test for analysis");
			results.forEach(function(item) {
				lme.d(item);
			})

			// delete the log file
			fs.unlink(PATH + '/log/' + fileName + '.json');

		} else {
			fieldsStream.write(JSON.stringify(fields));
			lme.i("OK");
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
		title: test.fullTitle(),
		duration: test.duration
	};
}

/**
 * Transform `error` into a JSON object.
 *
 * @api private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
	var res = {};
	Object.getOwnPropertyNames(err).forEach(function(key) {
		res[key] = err[key];
	}, err);
	return res;
}

// populate fields array
function addField(item) {
	item = item.replace(/,/g, ' ~ ')
	fields.fields.push(item);
}
