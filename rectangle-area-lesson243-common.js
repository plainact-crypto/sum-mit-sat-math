const d={slug:'rectangle-area',title:'Rectangle Area',base:'geometry-and-trigonometry/perimeter-and-area/rectangle-area'};
const a=require('./rectangle-area-lesson243-questions-a.json');const b=require('./rectangle-area-lesson243-questions-b.json');const c=require('./rectangle-area-lesson243-questions-c.json');
const p=a.concat(b,c);d.practice=p.map((q,i)=>({index:i+1,group:i<3?'Skill Check':i<11?'Core Practice':i<16?'Exam-Style':'Challenge',prompt:q[0],answer:q[1],solution:q[2]}));
d.test=require('./rectangle-area-lesson243-test.json').map((q,i)=>({index:i+1,difficulty:['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'][i],prompt:q[0],answer:q[1],solution:q[2]}));module.exports=d;
