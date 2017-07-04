const ProgressBar = require('progress');
const Listr = require('listr');

let bar = new ProgressBar(':bar', { total: 10 });
let timer = setInterval(function() {
	bar.tick();
	if (bar.complete) {
		console.log('\ncomplete\n');
		clearInterval(timer);
	}
}, 1000);

const tasks = new Listr([{
		title: 'task 1',
		task: () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve()
				}, 3000)
			})
		}
	},
	{
		title: 'Task 2',
		task: () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve()
				}, 3000)
			})
		}
	}
]);

tasks.run().catch(err => {
	console.error(err);
});
