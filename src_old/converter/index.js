#!/usr/bin/env node

const fs = require('fs');
const rootPath = require('app-root-path') + '';
const path = require('path');
const lme = require('lme');

const conf = require('./../config');

const getDirectories = require('./directories');

let final = {
	title: [] // headings
};

let dirCounter = 0;
let fileCounter = 0;

let erredFiles = [];

getDirectories()
	.then(dirs => {
		dirCounter = dirs.length;
		dirs.forEach(dir => {
			dirCounter--;
			let env = dir;
			dir = path.join(rootPath, conf.folder_name, 'logs', dir);
			fs.readdir(dir, (err, files) => {
				if (err) throw err;
				if (files.length === 0) throw new Error('No logs found. Run tests with insights reporter.');
				fileCounter = files.length;

				// store file names for headings
				final.title = files;

				// get each files
				files.forEach(file => {
					file = path.join(dir, file);
					lme.s('getting ' + file);
					let data = {};
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

				let writeStream = fs.createWriteStream(path.join(rootPath, conf.folder_name, `${env}-insights.xls`));

				Object.keys(final).forEach(function(key) {
					writeStream.write(key + ', ');
					final[key].forEach(function(value) {
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
