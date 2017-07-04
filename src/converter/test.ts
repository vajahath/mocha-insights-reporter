import {makeTasks} from './console-interface';

const pro = makeTasks(['hello', 'from']);

let i = 0;

setInterval(()=>{
    pro[i].resolve();
    i++
}, 3000)