import {makeTasks, makeProgress} from './console-interface';

const pro = makeTasks(['hello', 'from']);
// console.log();
const bar = makeProgress('chumma', 20)
let i = 0;

setInterval(()=>{
    pro[i].resolve();
    bar.tick();
    i++
}, 1000)