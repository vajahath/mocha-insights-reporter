import Listr = require('listr');
import * as Promise from 'bluebird';
import * as Progress from 'progress';

let allTasks;
let progressBar;

export function makeTasks(files:string[]){
    let tasks:object[] = [];
    let final:any = [];
    files.forEach(file=>{
        tasks.push({
            title: file,
            task:()=>{
               return new Promise((resolve, reject)=>{
                   final.push({resolve,reject});
               })
            }
        })
    })
    allTasks = new Listr(tasks);
    allTasks.run().catch(err => {
	    console.error(err);
    });
    return final;
}

export function makeProgress(dirname:string, total:number){
    progressBar = new Progress(` > Getting Insights - ${dirname} [:bar]`, {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: total
  })
  return progressBar;
}