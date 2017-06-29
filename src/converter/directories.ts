import * as Promise from 'bluebird';
import * as fs from 'fs';
import * as path from 'path';
import * as rootPath from 'app-root-path';

import conf from './../config';

// place that stores logs
const logPath = path.join(rootPath + '', conf.folder_name, 'logs');

export default () => {
	return new Promise((resolve, reject) => {
		fs.readdir(logPath, (err:any, dirs:any) => {
			if (err) reject(err);
			else resolve(dirs);
		});
	});
};
