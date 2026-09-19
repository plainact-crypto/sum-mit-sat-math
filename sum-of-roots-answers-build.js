const fs=require('fs');
const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'sum-of-roots-answers.html');
const route='/advanced-math/quadratic-equations/sum-of-roots/answers/';
if(!fs.existsSync(source)) throw new Error('Missing Sum of Roots answers source');
const html=fs.readFileSync(source,'utf8');
for(const marker of ['Exact 1-to-1 answers','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS','QA: exact 1-to-1']) if(!html.includes(marker)) throw new Error('Sum of Roots Answers marker missing: '+marker);
if((html.match(/class="answer"/g)||[]).length!==18) throw new Error('Sum of Roots Answers must contain exactly 18 answers');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
const sp=path.join(dist,'schedule.json');
if(fs.existsSync(sp)){const original=JSON.parse(fs.readFileSync(sp,'utf8')),s=original.filter(x=>x.route!==route),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval,cairo=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');s.forEach((x,i)=>{x.index=i+1;x.cairo=cairo(start+i*interval)+'+03:00';x.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(x=>[x.index,x.subject,x.section,x.group,x.lesson,x.pageType,x.route,x.cairo,x.timezone].map(q).join(',')).join('\n')+'\n');const ap=path.join(dist,'audit.json');if(fs.existsSync(ap)&&removed){const a=JSON.parse(fs.readFileSync(ap,'utf8'));a.completedContentPages=(a.completedContentPages||0)+removed;a.scheduledPages=s.length;a.contentSlotMinutes=20;fs.writeFileSync(ap,JSON.stringify(a,null,2));}}
console.log('Built Sum of Roots answers route');
