const fs=require('fs');
const path=require('path');
const root=__dirname;
const source=path.join(root,'quadratic-formula-answers.html');
const dist=path.join(root,'dist');
const route='/advanced-math/quadratic-equations/quadratic-formula/answers/';
const target=path.join(dist,'advanced-math','quadratic-equations','quadratic-formula','answers');
if(!fs.existsSync(source)) throw new Error('Missing Quadratic Formula answers source');
const html=fs.readFileSync(source,'utf8');
if(!html.includes('Answers must match current Problems 3/8/5/2')) throw new Error('Missing answers QA gate');
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
console.log('Built Quadratic Formula answers route');