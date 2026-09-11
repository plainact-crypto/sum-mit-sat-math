const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'overlapping-solution-regions-test.html');
if(!fs.existsSync(source))throw new Error('Missing overlapping-solution-regions-test.html');
const route='/algebra/systems-of-linear-inequalities/overlapping-solution-regions/test/';
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
const html=fs.readFileSync(source,'utf8');
if((html.match(/level:'/g)||[]).length!==5)throw new Error('Lesson Test must contain exactly 5 questions');
if(!html.includes("level:'HARD / EXAM-STYLE'"))throw new Error('Lesson Test must end at Hard / Exam-style');
if(html.includes('Check Answer'))throw new Error('Lesson Test must not reveal feedback before Submit Test');
const schedulePath=path.join(dist,'schedule.json');function cairoParts(ms){const d=new Date(ms);return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T')}
if(fs.existsSync(schedulePath)){const original=JSON.parse(fs.readFileSync(schedulePath,'utf8')),schedule=original.filter(r=>r.route!==route),removed=original.length-schedule.length,interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;schedule.forEach((r,i)=>{r.index=i+1;r.cairo=cairoParts(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"',head='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';fs.writeFileSync(path.join(dist,'schedule.csv'),head+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)&&removed){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+removed;audit.scheduledPages=schedule.length;audit.contentSlotMinutes=20;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}}
