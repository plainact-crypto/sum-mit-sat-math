const fs=require('fs');
const path=require('path');
const source=path.join(__dirname,'difference-of-squares-problems.html');
const route='advanced-math/factoring/difference-of-squares/problems';
if(!fs.existsSync(source)) throw new Error('Missing Difference of Squares problems source');
const html=fs.readFileSync(source,'utf8');
if(!html.includes("['SKILL CHECK'")||!html.includes("['CORE PRACTICE'")||!html.includes("['EXAM-STYLE PRACTICE'")||!html.includes("['CHALLENGE PROBLEMS'")) throw new Error('Missing required problem groups');
const out=path.join(__dirname,'dist',route);
fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(source,path.join(out,'index.html'));
const schedulePath=path.join(__dirname,'dist','schedule.json');
if(fs.existsSync(schedulePath)){
  const target='/advanced-math/factoring/difference-of-squares/problems/';
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(r=>r.route!==target);
  const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
  const cairoParts=ms=>{const d=new Date(ms),isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return isoLocal};
  schedule.forEach((r,i)=>{r.index=i+1;r.cairo=`${cairoParts(start+i*interval)}+03:00`;r.timezone='Africa/Cairo'});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
}
console.log('Built Difference of Squares problems route');
