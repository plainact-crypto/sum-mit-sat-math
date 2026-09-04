const fs=require('fs');const path=require('path');
const root=__dirname;const dist=path.join(root,'dist');
const overrides=[
  {base:path.join(dist,'algebra','linear-equations-in-one-variable','linear-equation-word-problems'),files:[['answers','linear-word-problems-answers.html'],['test','linear-word-problems-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','standard-form'),files:[['explanation','standard-form-explanation.html'],['problems','standard-form-problems.html'],['answers','standard-form-answers.html'],['test','standard-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','slope-intercept-form'),files:[['explanation','slope-intercept-form-explanation.html'],['problems','slope-intercept-form-problems.html'],['answers','slope-intercept-form-answers.html'],['test','slope-intercept-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','point-slope-form'),files:[['explanation','point-slope-form-explanation.html'],['problems','point-slope-form-problems.html'],['answers','point-slope-form-answers.html'],['test','point-slope-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','converting-between-forms'),files:[['explanation','converting-between-forms-explanation.html']]}
];
for(const item of overrides){for(const [dir,file] of item.files){const target=path.join(item.base,dir);fs.mkdirSync(target,{recursive:true});fs.copyFileSync(path.join(root,file),path.join(target,'index.html'));}}
const completedRoutes=new Set([
  '/algebra/linear-equations-in-one-variable/linear-equation-word-problems/answers/',
  '/algebra/linear-equations-in-two-variables/standard-form/explanation/',
  '/algebra/linear-equations-in-two-variables/standard-form/problems/',
  '/algebra/linear-equations-in-two-variables/standard-form/answers/',
  '/algebra/linear-equations-in-two-variables/slope-intercept-form/explanation/',
  '/algebra/linear-equations-in-two-variables/slope-intercept-form/problems/',
  '/algebra/linear-equations-in-two-variables/slope-intercept-form/answers/',
  '/algebra/linear-equations-in-two-variables/point-slope-form/explanation/',
  '/algebra/linear-equations-in-two-variables/point-slope-form/problems/',
  '/algebra/linear-equations-in-two-variables/point-slope-form/answers/',
  '/algebra/linear-equations-in-two-variables/converting-between-forms/explanation/'
]);
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const schedule=original.filter(r=>!completedRoutes.has(r.route));
  const removed=original.length-schedule.length;
  const start=Date.UTC(2026,8,3,19,0,0);
  function cairoParts(ms){const d=new Date(ms);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{isoLocal}}
  schedule.forEach((r,i)=>{const p=cairoParts(start+i*12*60*1000);r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csvHeader='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';const csv=csvHeader+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);
  const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+removed;audit.scheduledPages=schedule.length;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}
}