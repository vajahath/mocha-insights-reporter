const fs = require('fs');
const rootPath = require('app-root-path');
const toCSV = require('json2csv');

let bigArray = [];
let writeStream;

const PATH = rootPath + '/insights';
const fields = ['title', 'fullTitle', 'duration', 'currentRetry', 'err'];
writeStream = fs.createWriteStream(PATH + '/' + Date.now() + '.xls');

fs.readdir(PATH + '/log/', function(err, items) {
	console.log(items.length);

	items.forEach(function(item) {
		bigArray = bigArray.concat(require(PATH + item));
	});

	try {
		let result = toCSV({ data: bigArray, fields: fields });
		writeStream.write(result);
	} catch (err) {
		console.log(err);
	}
});
