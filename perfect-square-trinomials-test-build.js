const fs=require('fs');
const path=require('path');
const source=path.join(__dirname,'perfect-square-trinomials-test.html');
const route='advanced-math/factoring/perfect-square-trinomials/test';
if(!fs.existsSync(source)) throw new Error('Missing Perfect-Square Trinomials test source');
const html=fs.readFileSync(source,'utf8');
for(const marker of ['LESSON TEST','Perfect-Square Trinomials','exactly 5 questions','Submit Test','Results and explanations appear only after Submit Test']) if(!html.includes(marker)) throw new Error(`Missing test marker: ${marker}`);
const questionCount=(html.match(/level:'/g)||[]).length;
if(questionCount!==5) throw new Error(`Expected 5 test questions, found ${questionCount}`);
const out=path.join(__dirname,'dist',route);
fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(source,path.join(out,'index.html'));
const schedulePath=path.join(__dirname,'dist','schedule.json');
if(fs.existsSync(schedulePath)){
  const target='/advanced-math/factoring/perfect-square-trinomials/test/';
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const schedule=original.filter(r=>r.route!==target);
  const removed=original.length-schedule.length;
  if(removed>1) throw new Error(`Duplicate test route in schedule: ${removed}`);
  if(removed){
    const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
    const cairoParts=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');
    schedule.forEach((r,i)=>{r.index=i+1;r.cairo=`${cairoParts(start+i*interval)}+03:00`;r.timezone='Africa/Cairo'});
    fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  }
}
console.log('Built Perfect-Square Trinomials test route');
require('./factoring-by-grouping-explanation-build.js');
