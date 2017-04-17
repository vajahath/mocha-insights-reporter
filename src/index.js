'use strict';

/**
 * Module dependencies.
 */
var mocha = require('mocha');
var fs = require('fs');
var rootPath = require('app-root-path');
var mkdirp = require('mkdirp');

exports = module.exports = pencilReporter;

var writeStream;
var fixer = '[';

mkdirp(rootPath + '/insights/logs/', function(err) {
	if (err) {
		lme.e(err);
		throw (err);
		return;
	}

	writeStream = fs.createWriteStream(rootPath + '/insights/logs/' + Date.now() + '.json');
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
	return {
		title: test.title,
		fullTitle: test.fullTitle(),
		duration: test.duration,
		currentRetry: test.currentRetry(),
		err: errorJSON(test.err || {})
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
