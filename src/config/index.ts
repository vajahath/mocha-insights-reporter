// determine configurations
import * as lme from 'lme';
import * as rootPath from 'app-root-path';
import default_conf from './default-config';

let user_conf = {};

try {
	user_conf = rootPath.require('insights_config.json');
} catch (e) {
	// no problem if nothing is provided
	lme.i('using default configs');
}

// merge configs

const config: any = Object.assign({}, default_conf, user_conf);

export default config;
