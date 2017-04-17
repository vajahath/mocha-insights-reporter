// determine configurations

var rootPath = require('app-root-path');

var default_conf = require('./default-config.json');
var user_conf = {};

try {
	user_conf = rootPath.require('insights_config.json');
} catch (e) {
	// no problem if nothing is provided
	lme.i('using default configs');
}

// merge configs
var config = Object.assign({}, default_conf, user_conf);

module.exports = config;