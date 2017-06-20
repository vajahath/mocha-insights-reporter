// module to determine file name

const path = require('path');
const username = require('username').sync();
const dirPath = require('./directory-maker');

module.exports = path.join(dirPath, username + '-' + new Date().toJSON() + '.json');
