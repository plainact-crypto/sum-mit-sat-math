const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist'),source=path.join(root,'special-polynomial-products-answers.html');
if(!fs.existsSync(source))throw new Error('Missing special-polynomial-products-answers.html');
const route='/advanced-math/polynomial-operations/special-polynomial-products/answers/';
const html=fs.readFileSync(source,'utf8');
for(const marker of ['ANSWERS &amp; SOLUTIONS','Special Polynomial Products','Solutions correspond exactly to Practice Questions 1–18.','Answer: A) x² + 12x + 36','Answer: A) 24x'])if(!html.includes(marker))throw new Error(`Answers source failed marker: ${marker}`);
if((html.match(/class="answer"/g)||[]).length!==18)throw new Error('Special Polynomial Products answers must contain exactly 18 solutions');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
const sp=path.join(dist,'schedule.json');
function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(sp)){const original=JSON.parse(fs.readFileSync(sp,'utf8')),s=original.filter(r=>r.route!==route),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;if(removed>1)throw new Error(`Expected at most one scheduled Special Polynomial Products answers route; removed ${removed}`);if(removed>0){s.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');}}
console.log('Built Special Polynomial Products answers route');