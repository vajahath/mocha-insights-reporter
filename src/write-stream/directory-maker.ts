// create directory structure and export that path

import * as mkdirp from 'mkdirp';
import conf from './../config';

const env: string = process.env.NODE_ENV || 'default_env';

// directory path
const path: string = conf.folder_name + '/logs/' + env + '/';

// make directory sync.ly
mkdirp.sync(path);

export default path;
