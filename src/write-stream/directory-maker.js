// create directory structure and export that path

const mkdirp = require('mkdirp');
const conf = require('./../config');

const env = process.env.NODE_ENV || 'default_env'

// directory path
const path = conf.folder_name + '/logs/' + env + '/';

// make directory sync.ly
mkdirp.sync(path)

module.exports = path;
