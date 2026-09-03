const fs=require('fs');const path=require('path');
const root=__dirname;const dist=path.join(root,'dist');
const base=path.join(dist,'algebra','linear-equations-in-one-variable','linear-equation-word-problems');
for(const [dir,file] of [['answers','linear-word-problems-answers.html'],['test','linear-word-problems-test.html']]){const target=path.join(base,dir);fs.mkdirSync(target,{recursive:true});fs.copyFileSync(path.join(root,file),path.join(target,'index.html'));}
const completedRoute='/algebra/linear-equations-in-one-variable/linear-equation-word-problems/answers/';
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(r=>r.route!==completedRoute);
  const start=Date.UTC(2026,8,3,19,0,0);
  function cairoParts(ms){const d=new Date(ms);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{isoLocal}}
  schedule.forEach((r,i)=>{const p=cairoParts(start+i*12*60*1000);r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csvHeader='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';const csv=csvHeader+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);
  const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+1;audit.scheduledPages=schedule.length;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}
}
