const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const rootPath = require('app-root-path') + '';

const conf = require('./../config');

// place that stores logs
const logPath = path.join(rootPath, conf.folder_name, 'logs');

module.exports = () => {
	return new Promise((resolve, reject) => {
		fs.readdir(logPath, (err, dirs) => {
			if (err) reject(err);
			else resolve(dirs);
		})
	})
}
