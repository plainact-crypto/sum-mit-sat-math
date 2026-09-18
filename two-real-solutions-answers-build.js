const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist'),source=path.join(root,'two-real-solutions-answers.html');
const route='/advanced-math/quadratic-equations/two-real-solutions/answers/';
if(!fs.existsSync(source))throw new Error('Missing Two Real Solutions answers source');
const html=fs.readFileSync(source,'utf8');
for(const marker of ['Two Real Solutions','ANSWERS','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS','Answers must match current Problems 3/8/5/2'])if(!html.includes(marker))throw new Error('Answers marker missing: '+marker);
const out=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(out,{recursive:true});fs.copyFileSync(source,path.join(out,'index.html'));
const twoTestSource=path.join(root,'two-real-solutions-test.html'),twoTestRoute='/advanced-math/quadratic-equations/two-real-solutions/test/';
if(!fs.existsSync(twoTestSource))throw new Error('Missing Two Real Solutions test source');
const twoTest=fs.readFileSync(twoTestSource,'utf8');
const twoMatch=twoTest.match(/const qs=\[(.*?)\];const root=/s);if(!twoMatch)throw new Error('Missing Two Real Solutions test question bank');
if((twoMatch[1].match(/\{level:/g)||[]).length!==5)throw new Error('Two Real Solutions Lesson Test must contain exactly 5 questions');
if(!twoTest.includes("document.getElementById('submit').onclick"))throw new Error('Two Real Solutions test must defer feedback until submit');
const twoTestOut=path.join(dist,twoTestRoute.replace(/^\//,''));fs.mkdirSync(twoTestOut,{recursive:true});fs.copyFileSync(twoTestSource,path.join(twoTestOut,'index.html'));
const noRealSource=path.join(root,'no-real-solutions-answers.html'),noRealRoute='/advanced-math/quadratic-equations/no-real-solutions/answers/';
if(!fs.existsSync(noRealSource))throw new Error('Missing No Real Solutions answers source');
const noReal=fs.readFileSync(noRealSource,'utf8');
for(const marker of ['No Real Solutions','ANSWERS','Exact answers to the 18 current Practice Problems.','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS','Answers must match current Problems 3/8/5/2'])if(!noReal.includes(marker))throw new Error('No Real Solutions answers marker missing: '+marker);
if((noReal.match(/\[\[\"/g)||[]).length<4)throw new Error('No Real Solutions answers structure missing');
const noRealOut=path.join(dist,noRealRoute.replace(/^\//,''));fs.mkdirSync(noRealOut,{recursive:true});fs.copyFileSync(noRealSource,path.join(noRealOut,'index.html'));
const testSource=path.join(root,'no-real-solutions-test.html'),testRoute='/advanced-math/quadratic-equations/no-real-solutions/test/';
if(!fs.existsSync(testSource))throw new Error('Missing No Real Solutions test source');
const test=fs.readFileSync(testSource,'utf8');
if(!test.includes("if(qs.length!==5)throw new Error('Lesson Test must contain exactly 5 questions')"))throw new Error('No Real Solutions test five-question gate missing');
if(!test.includes("document.getElementById('submit').onclick"))throw new Error('No Real Solutions test must defer feedback until submit');
const testOut=path.join(dist,testRoute.replace(/^\//,''));fs.mkdirSync(testOut,{recursive:true});fs.copyFileSync(testSource,path.join(testOut,'index.html'));
const sp=path.join(dist,'schedule.json');function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(sp)){const original=JSON.parse(fs.readFileSync(sp,'utf8')),published=new Set([route,twoTestRoute,noRealRoute,testRoute]),s=original.filter(r=>!published.has(r.route)),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;s.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));const q=v=>'\"'+String(v??'').replace(/\"/g,'\"\"')+'\"';fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');const ap=path.join(dist,'audit.json');if(fs.existsSync(ap)&&removed){const a=JSON.parse(fs.readFileSync(ap,'utf8'));a.completedContentPages=(a.completedContentPages||0)+removed;a.scheduledPages=s.length;a.contentSlotMinutes=20;fs.writeFileSync(ap,JSON.stringify(a,null,2));}}
console.log('Built Two Real Solutions answers/test + No Real Solutions answers/test routes and completed schedule entries');