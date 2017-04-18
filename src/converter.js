#!/usr/bin/env node

const fs = require('fs');
const lme = require('lme');
var conf = require('./config');

const PATH = conf.PATH;

let writeStream;
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

	writeStream = fs.createWriteStream(PATH + '/' + conf.excel_file_name);

	Object.keys(final).forEach(function(key) {
		writeStream.write(key + ', ');
		final[key].forEach(function(value) {
			writeStream.write(value + ', ');
		})
		writeStream.write('\n');
	})

});
