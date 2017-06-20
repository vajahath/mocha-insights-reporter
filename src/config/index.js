// determine configurations
const lme = require('lme');
const rootPath = require('app-root-path');

const default_conf = require('./default-config.json');
let user_conf = {};

try {
	user_conf = rootPath.require('insights_config.json');
} catch (e) {
	// no problem if nothing is provided
	lme.i('using default configs');
}

// merge configs
const config = Object.assign({}, default_conf, user_conf);

module.exports = config;
