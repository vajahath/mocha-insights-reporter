#!/usr/bin/env node

const fs = require('fs');
const rootPath = require('app-root-path');
const toCSV = require('json2csv');
const lme = require('lme');


let writeStream;

const PATH = rootPath + '/insights';
var fields;

try {
	fields = require(PATH + '/data/fields.json').fields;
} catch (err) {
	lme.e("No fields file.");
	lme.e("try running the tests with insights reporter");
	process.exit(1);
}

var final = {
	title: [], // headings
};

fs.readdir(PATH + '/log/', function(err, items) {
	if (!items) {
		lme.e('No logs found. Run tests with insights reporter.');
		process.exit(1);
	}
	final.title = items;

	items.forEach(function(item) {
		console.log('getting ' + PATH + '/' + item + ' ...')
		var data = require(PATH + '/log/' + item);

		data.forEach(function(test) {
			if (final[test.title]) {
				final[test.title].push(test.duration);
			} else {
				final[test.title] = [test.duration];
			}
		})
	});

	writeStream = fs.createWriteStream(PATH + '/stats.xls');

	Object.keys(final).forEach(function(key) {
		writeStream.write(key + ', ');
		final[key].forEach(function(value) {
			writeStream.write(value + ', ');
		})
		writeStream.write('\n');
	})

});
