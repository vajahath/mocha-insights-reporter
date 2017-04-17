'use strict';

/**
 * Module dependencies.
 */
var mocha = require('mocha');
var fs = require('fs');
var rootPath = require('app-root-path');
var mkdirp = require('mkdirp');
var lme = require('lme');

var PATH = rootPath + '/insights';

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

var writeStream;
var fieldsStream;
var fixer = '[';
var fileName = Date.now();

mkdirp(rootPath + '/insights/data/', function(e) {
	if (e) {
		lme.e(e);
		throw (e);
		return;
	}
	fieldsStream = fs.createWriteStream(PATH + '/data/fields.json');
});

mkdirp(rootPath + '/insights/log/', function(err) {
	if (err) {
		lme.e(err);
		throw (err);
		return;
	}
	writeStream = fs.createWriteStream(rootPath + '/insights/log/' + fileName + '.json');
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
		fieldsStream.write(JSON.stringify(fields));
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
	if (fields.fields.indexOf(item) < 0) {
		fields.fields.push(item);
	}
}
