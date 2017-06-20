const fs = require('fs');
const filename = require('./file-namer');

let writeStream = fs.createWriteStream(filename);

module.exports = {
	writeStream,
	filename
}
