const fs=require('fs');
const path=require('path');
const root=__dirname;
const source=path.join(root,'one-real-solution-test.html');
const dist=path.join(root,'dist');
const route='/advanced-math/quadratic-equations/one-real-solution/test/';
const target=path.join(dist,'advanced-math','quadratic-equations','one-real-solution','test');
if(!fs.existsSync(source)) throw new Error('Missing One Real Solution test source');
const html=fs.readFileSync(source,'utf8');
const match=html.match(/const qs=\[(.*?)\];const root=/s);
if(!match) throw new Error('Missing lesson test question bank');
const questionCount=(match[1].match(/\{level:/g)||[]).length;
if(questionCount!==5) throw new Error(`Lesson Test must contain exactly 5 questions; found ${questionCount}`);
if(!html.includes("document.getElementById('submit').onclick")) throw new Error('Test must defer feedback until Submit Test');
fs.mkdirSync(target,{recursive:true});
fs.copyFileSync(source,path.join(target,'index.html'));
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(item=>item.route!==route);
  const slotMs=20*60*1000;
  const start=Math.ceil((Date.now()+60000)/slotMs)*slotMs;
  const cairo=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');
  schedule.forEach((item,index)=>{item.index=index+1;item.cairo=cairo(start+index*slotMs)+'+03:00';item.timezone='Africa/Cairo';});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
}
console.log('Built One Real Solution lesson test route');
// Final canonical package pass: guarantees Explanation + 18/18/5 alignment after legacy builders.
require('./one-real-solution-content-build.js');
