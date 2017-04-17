#!/usr/bin/env node

const fs = require('fs');
const rootPath = require('app-root-path');
const toCSV = require('json2csv');

let bigArray = [];
let writeStream;

const PATH = rootPath + '/insights';
const fields = ['title', 'fullTitle', 'duration', 'currentRetry', 'err'];

fs.readdir(PATH + '/log/', function(err, items) {
	// console.log(items.length);

	items.forEach(function(item) {
<<<<<<< HEAD
		console.log('getting ' + PATH + '/' + item + ' ...')
		bigArray = bigArray.concat(require(PATH + '/log/' + item));
=======
		console.log('getting ' + PATH + item + ' ...')
		bigArray = bigArray.concat(require(PATH + '/' + item));
>>>>>>> 751d2ac4d42f517c6215ae5e7c021d523375bdd5
	});

	try {
		let result = toCSV({ data: bigArray, fields: fields });
		if (result) {
			writeStream = fs.createWriteStream(PATH + '/stats.xls');
			writeStream.write(result);
		}
	} catch (err) {
		console.log(err);
	}
});
