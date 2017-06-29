// module to determine file name

import * as path from 'path';
import * as username from 'username';

import dirPath from './directory-maker';

const gottenUsername = username.sync();

export default path.join(dirPath, username + '-' + new Date().toJSON() + '.json');