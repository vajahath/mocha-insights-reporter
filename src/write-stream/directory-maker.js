// create directory structure and export that path

const mkdirp = require('mkdirp');
const Promise = require('bluebird');
const conf = require('./../config');

const env = process.env.NODE_ENV || 'default_env'

// directory path
const path = conf.folder_name + '/logs/' + env + '/';

module.exports = () => {
	return new Promise((resolve, reject) => {
		mkdirp(path, err => {
			if (err) reject(err);
			else resolve(path); // return path
		})
	})
}
