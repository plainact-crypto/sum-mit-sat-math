const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'boundary-lines-answers.html');
if(!fs.existsSync(source))throw new Error('Missing boundary-lines-answers.html');
const route='/algebra/linear-inequalities/boundary-lines/answers/';
const target=path.join(dist,route.replace(/^\//,''));
fs.mkdirSync(target,{recursive:true});
fs.copyFileSync(source,path.join(target,'index.html'));
const problemsSource=path.join(root,'boundary-lines-problems.html');
if(!fs.existsSync(problemsSource))throw new Error('Missing boundary-lines-problems.html');
const problems=fs.readFileSync(problemsSource,'utf8');
for(const marker of ['Boundary Lines','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'])if(!problems.includes(marker))throw new Error('Boundary Lines problems marker missing: '+marker);
if((problems.match(/\["/g)||[]).length<18)throw new Error('Boundary Lines Problems source appears incomplete');
const problemsRoute='/algebra/linear-inequalities/boundary-lines/problems/';
const problemsTarget=path.join(dist,problemsRoute.replace(/^\//,''));
fs.mkdirSync(problemsTarget,{recursive:true});
fs.copyFileSync(problemsSource,path.join(problemsTarget,'index.html'));
const explanationSource=path.join(root,'boundary-lines-explanation.html');
if(!fs.existsSync(explanationSource))throw new Error('Missing boundary-lines-explanation.html');
const explanationRoute='/algebra/linear-inequalities/boundary-lines/explanation/';
const explanationTarget=path.join(dist,explanationRoute.replace(/^\//,''));
fs.mkdirSync(explanationTarget,{recursive:true});
fs.copyFileSync(explanationSource,path.join(explanationTarget,'index.html'));
const testSource=path.join(root,'boundary-lines-test.html');
if(!fs.existsSync(testSource))throw new Error('Missing boundary-lines-test.html');
const test=fs.readFileSync(testSource,'utf8');
for(const marker of ['LESSON TEST','Boundary Lines','Submit Test'])if(!test.includes(marker))throw new Error('Boundary Lines test marker missing: '+marker);
const testRoute='/algebra/linear-inequalities/boundary-lines/test/';
const testTarget=path.join(dist,testRoute.replace(/^\//,''));
fs.mkdirSync(testTarget,{recursive:true});
fs.copyFileSync(testSource,path.join(testTarget,'index.html'));
const schedulePath=path.join(dist,'schedule.json');
function cairoParts(ms){const d=new Date(ms);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{isoLocal}}
if(fs.existsSync(schedulePath)){
 const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
 const schedule=original.filter(r=>r.route!==route&&r.route!==problemsRoute&&r.route!==explanationRoute&&r.route!==testRoute);
 const removed=original.length-schedule.length;
 const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
 schedule.forEach((r,i)=>{r.index=i+1;r.cairo=`${cairoParts(start+i*interval).isoLocal}+03:00`;r.timezone='Africa/Cairo'});
 fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
 const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,head='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';
 fs.writeFileSync(path.join(dist,'schedule.csv'),head+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');
 const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)&&removed){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+removed;audit.scheduledPages=schedule.length;audit.contentSlotMinutes=20;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}
}
