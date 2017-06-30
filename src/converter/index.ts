#!/usr/bin/env node

import * as fs from 'fs';
import * as rootPath from 'app-root-path';
import * as path from 'path';
import * as lme from 'lme';

import conf from './../config';
import getDirectories from './directories';

let final:any = {
	title: [] // headings
};

let dirCounter:number = 0;
let fileCounter:number = 0;

let erredFiles:any[] = [];

getDirectories()
	.then((dirs:string[]) => {
		dirCounter = dirs.length;
		dirs.forEach((dir:string) => {
			dirCounter--;
			let env = dir;
			dir = path.join(rootPath+'', conf.folder_name, 'logs', dir);
			fs.readdir(dir, (err:object, files:string[]) => {
				if (err) throw err;
				if (files.length === 0) throw new Error('No logs found. Run tests with insights reporter.');
				fileCounter = files.length;

				// store file names for headings
				final.title = files;

				// get each files
				files.forEach((file:string) => {
					file = path.join(dir, file);
					lme.s('getting ' + file);
					let data:any[];
					try {
						data = require(file);
						fileCounter--;
					} catch (err) {
						lme.e(err);
						erredFiles.push({ file: file, err: err + '' });
						fileCounter--;
						return;
					}

					data.forEach(function(test) {
						if (final[test.title]) {
							final[test.title].push(test.duration);
						} else {
							final[test.title] = [test.duration];
						}
					});

					if (erredFiles.length && dirCounter <= 0 && fileCounter <= 0) {
						lme.line('--');
						lme.e('There are some files skipped due to err. Details are given below');
						lme.line('--');
						lme.h(erredFiles);
					}
				});

				let writeStream = fs.createWriteStream(path.join(rootPath+'', conf.folder_name, `${env}-insights.xls`));

				Object.keys(final).forEach((key)=>{
					writeStream.write(key + ', ');
					final[key].forEach(function(value:number) {
						writeStream.write(value + ', ');
					});
					writeStream.write('\n');
				});
			});
		});
	})
	.catch(err => {
		console.log(err);
		process.exit(1);
	});
