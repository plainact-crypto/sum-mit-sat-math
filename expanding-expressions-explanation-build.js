const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const items=[
 {source:'expanding-expressions-explanation.html',route:'/advanced-math/equivalent-expressions/expanding-expressions/explanation/',markers:['<div class="page-type">Explanation</div>','<div class="lesson-title">Expanding Expressions</div>','lesson-content','EXPLANATION_CLASSIFICATION: NEITHER','3(x + 4) - 2(x - 5)','3[2x - (x - 4)]']},
 {source:'greatest-common-factor-explanation.html',route:'/advanced-math/factoring/greatest-common-factor/explanation/',markers:['<div class="page-type">Explanation</div>','<div class="lesson-title">Greatest Common Factor</div>','lesson-content','EXPLANATION_CLASSIFICATION: NEITHER','18x³y² + 24x²y³','6x²y²(3x + 4y)','7x²y(2x−3y+5)']}
];
for(const item of items){
 const source=path.join(root,item.source);if(!fs.existsSync(source))throw new Error(`Missing ${item.source}`);
 const html=fs.readFileSync(source,'utf8');
 for(const marker of item.markers)if(!html.includes(marker))throw new Error(`${item.source} failed marker: ${marker}`);
 if(/summit-desmos-strategy|data-summit-graph/i.test(html))throw new Error(`${item.source}: NEITHER Explanation must not include Graph or Desmos blocks`);
 const target=path.join(dist,item.route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));
}
const sp=path.join(dist,'schedule.json');
function cairo(ms){return new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T')}
if(fs.existsSync(sp)){
 const original=JSON.parse(fs.readFileSync(sp,'utf8')),routes=new Set(items.map(x=>x.route)),s=original.filter(r=>!routes.has(r.route)),removed=original.length-s.length,interval=20*60*1000,start=Math.ceil((Date.now()+60000)/interval)*interval;
 if(removed>items.length)throw new Error(`Expected at most ${items.length} scheduled Explanation routes; removed ${removed}`);
 if(removed){
  s.forEach((r,i)=>{r.index=i+1;r.cairo=cairo(start+i*interval)+'+03:00';r.timezone='Africa/Cairo'});
  fs.writeFileSync(sp,JSON.stringify(s,null,2));
  const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
  fs.writeFileSync(path.join(dist,'schedule.csv'),'index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+s.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');
  const ap=path.join(dist,'audit.json');if(fs.existsSync(ap)){const a=JSON.parse(fs.readFileSync(ap,'utf8'));a.completedContentPages=(a.completedContentPages||0)+removed;a.scheduledPages=s.length;a.contentSlotMinutes=20;fs.writeFileSync(ap,JSON.stringify(a,null,2));}
 }
}
