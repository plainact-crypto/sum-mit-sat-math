const fs=require('fs');
const path=require('path');
const source=path.join(__dirname,'factoring-trinomials-answers.html');
const route='advanced-math/factoring/factoring-trinomials/answers';
if(!fs.existsSync(source)) throw new Error('Missing Factoring Trinomials answers source');
const html=fs.readFileSync(source,'utf8');
if((html.match(/class="answer"/g)||[]).length!==18) throw new Error('Expected exactly 18 answers');
const out=path.join(__dirname,'dist',route);
fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(source,path.join(out,'index.html'));
const schedulePath=path.join(__dirname,'dist','schedule.json');
if(fs.existsSync(schedulePath)){
  const target='/advanced-math/factoring/factoring-trinomials/answers/';
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(r=>r.route!==target);
  const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
  const cairoParts=ms=>{const d=new Date(ms),isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return isoLocal};
  schedule.forEach((r,i)=>{r.index=i+1;r.cairo=`${cairoParts(start+i*interval)}+03:00`;r.timezone='Africa/Cairo'});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
}
console.log('Built Factoring Trinomials answers route and removed it from the release schedule');
