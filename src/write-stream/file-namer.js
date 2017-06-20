// module to determine file name

const { parallel } = require('async')
const username = require('username');
const Promise = require('bluebird');
const directoryMaker = require('./directory-maker');

module.exports = () => {
	return new Promise((resolve, reject) => {
		// create directory and export the filename with path
		parallel([
			cb => {
				directoryMaker()
					.then(path => (cb(null, path)))
					.catch(err => (err));
			},
			cb => {
				username()
					.then(name => {
						let fullName = name + '-' + new Date().toJSON();
						cb(null, fullName);
					})
					.catch(err => (cb(err)));
			}
		], (err, results) => {
			if (err) reject(err);
			else {
				let fullPath = results[0] + results[1] + '.json';
				resolve(fullPath);
			}
		})
	})
}
