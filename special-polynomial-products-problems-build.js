const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist'),source=path.join(root,'special-polynomial-products-problems.html');
if(!fs.existsSync(source))throw new Error('Missing special-polynomial-products-problems.html');
const route='/advanced-math/polynomial-operations/special-polynomial-products/problems/';
const html=fs.readFileSync(source,'utf8');
for(const marker of ['PRACTICE PROBLEMS','Special Polynomial Products','18 questions','SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'])if(!html.includes(marker))throw new Error(`Problems source failed marker: ${marker}`);
const counts=[...html.matchAll(/\[\["(SKILL CHECK|CORE PRACTICE|EXAM-STYLE PRACTICE|CHALLENGE PROBLEMS)"/g)].length;if(counts!==4)throw new Error('Problems must contain all four locked sections');
if(!html.includes("if(n!==18||groups[0][2].length!==3||groups[1][2].length!==8||groups[2][2].length!==5||groups[3][2].length!==2)"))throw new Error('Problems must enforce exactly 3/8/5/2 = 18 questions');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
const sp=path.join(dist,'schedule.json');
function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(sp)){const original=JSON.parse(fs.readFileSync(sp,'utf8')),s=original.filter(r=>r.route!==route),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;if(removed>1)throw new Error(`Expected at most one scheduled Special Polynomial Products problems route; removed ${removed}`);if(removed>0){s.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');}}
require('./special-polynomial-products-answers-build.js');
console.log('Built Special Polynomial Products problems route');