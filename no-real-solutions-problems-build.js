const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'no-real-solutions-problems.html');
const route='/advanced-math/quadratic-equations/no-real-solutions/problems/';
if(!fs.existsSync(source))throw new Error('Missing No Real Solutions problems source');
const html=fs.readFileSync(source,'utf8');
for(const marker of ['No Real Solutions','18 original questions','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS','QA: 3/8/5/2 required'])if(!html.includes(marker))throw new Error('No Real Solutions problems marker missing: '+marker);
const counts={skill:(html.match(/<h2>SKILL CHECK<\/h2>/g)||[]).length,core:(html.match(/<h2>CORE PRACTICE<\/h2>/g)||[]).length,exam:(html.match(/<h2>EXAM-STYLE PRACTICE<\/h2>/g)||[]).length,challenge:(html.match(/<h2>CHALLENGE PROBLEMS<\/h2>/g)||[]).length,questions:(html.match(/<div class="question">/g)||[]).length};
if(counts.skill!==1||counts.core!==1||counts.exam!==1||counts.challenge!==1||counts.questions!==18)throw new Error('No Real Solutions problems structure invalid: '+JSON.stringify(counts));
const out=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(out,{recursive:true});fs.copyFileSync(source,path.join(out,'index.html'));
const sp=path.join(dist,'schedule.json');
if(fs.existsSync(sp)){
  const original=JSON.parse(fs.readFileSync(sp,'utf8'));
  const s=original.filter(item=>item.route!==route);
  const slotMs=20*60*1000,start=Math.ceil((Date.now()+60000)/slotMs)*slotMs;
  const cairo=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');
  s.forEach((item,index)=>{item.index=index+1;item.cairo=cairo(start+index*slotMs)+'+03:00';item.timezone='Africa/Cairo';});
  fs.writeFileSync(sp,JSON.stringify(s,null,2));
}
console.log('Built No Real Solutions problems route with 18-question QA gate');
