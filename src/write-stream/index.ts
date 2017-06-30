import * as fs from 'fs';
import filename from './file-namer'

export const writeStream = fs.createWriteStream(filename);
export { filename };