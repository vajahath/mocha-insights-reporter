const fs = require('fs');
const getFilename = require('./file-namer');
const Promise = require('bluebird');

let writeStream = {};

module.exports = () => {
	return new Promise((resolve, reject) => {
		getFilename()
			.then(filename => {
				writeStream = fs.createWriteStream(filename);
				resolve({
					writeStream: writeStream,
					filename: filename
				});
			})
			.catch(err => (reject(err)));
	})
}
