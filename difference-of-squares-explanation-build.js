const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist'),source=path.join(root,'difference-of-squares-explanation.html');
if(!fs.existsSync(source))throw new Error('Missing difference-of-squares-explanation.html');
const route='/advanced-math/factoring/difference-of-squares/explanation/';
const html=fs.readFileSync(source,'utf8');
for(const marker of ['Difference of Squares','EXPLANATION_CLASSIFICATION: DESMOS_USEFUL','DESMOS STRATEGY','Enter','Look for','Use it to answer','Why it works','Faster or not?','3(2x − 5)(2x + 5)'])if(!html.includes(marker))throw new Error(`Difference of Squares source failed marker: ${marker}`);
if(/data-summit-graph/i.test(html))throw new Error('DESMOS_USEFUL Difference of Squares explanation must not require a graph');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
const built=fs.readFileSync(path.join(target,'index.html'),'utf8');
for(const marker of ['EXPLANATION_CLASSIFICATION: DESMOS_USEFUL','x-intercepts at x = −5 and x = 5','(x−5)(x+5)','Math cross-check'])if(!built.includes(marker))throw new Error(`Built Difference of Squares route failed marker: ${marker}`);
const sp=path.join(dist,'schedule.json');
function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(sp)){const original=JSON.parse(fs.readFileSync(sp,'utf8')),s=original.filter(r=>r.route!==route),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;if(removed>1)throw new Error(`Expected at most one scheduled Difference of Squares Explanation route; removed ${removed}`);if(removed>0){s.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');}}
console.log('Built Difference of Squares explanation route');