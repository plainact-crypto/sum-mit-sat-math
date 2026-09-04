const fs=require('fs');const path=require('path');
const root=__dirname;const dist=path.join(root,'dist');
const overrides=[
  {base:path.join(dist,'algebra','linear-equations-in-one-variable','linear-equation-word-problems'),files:[['answers','linear-word-problems-answers.html'],['test','linear-word-problems-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','standard-form'),files:[['explanation','standard-form-explanation.html'],['problems','standard-form-problems.html'],['answers','standard-form-answers.html'],['test','standard-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','slope-intercept-form'),files:[['explanation','slope-intercept-form-explanation.html'],['problems','slope-intercept-form-problems.html'],['answers','slope-intercept-form-answers.html'],['test','slope-intercept-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','point-slope-form'),files:[['explanation','point-slope-form-explanation.html'],['problems','point-slope-form-problems.html'],['answers','point-slope-form-answers.html'],['test','point-slope-form-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','converting-between-forms'),files:[['explanation','converting-between-forms-explanation.html'],['problems','converting-between-forms-problems.html'],['answers','converting-between-forms-answers.html'],['test','converting-between-forms-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','finding-x-intercept'),files:[['explanation','finding-x-intercept-explanation.html'],['problems','finding-x-intercept-problems.html'],['answers','finding-x-intercept-answers.html'],['test','finding-x-intercept-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','finding-y-intercept'),files:[['explanation','finding-y-intercept-explanation.html'],['problems','finding-y-intercept-problems.html'],['answers','finding-y-intercept-answers.html'],['test','finding-y-intercept-test.html']]},
  {base:path.join(dist,'algebra','linear-equations-in-two-variables','finding-both-intercepts'),files:[['explanation','finding-both-intercepts-explanation.html'],['problems','finding-both-intercepts-problems.html'],['answers','finding-both-intercepts-answers.html'],['test','finding-both-intercepts-test.html']]},
  {base:path.join(dist,'algebra','linear-functions','function-notation-for-linear-functions'),files:[['explanation','function-notation-linear-functions-explanation.html']]}
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
  '/algebra/linear-equations-in-two-variables/converting-between-forms/explanation/',
  '/algebra/linear-equations-in-two-variables/converting-between-forms/problems/',
  '/algebra/linear-equations-in-two-variables/converting-between-forms/answers/',
  '/algebra/linear-equations-in-two-variables/finding-x-intercept/explanation/',
  '/algebra/linear-equations-in-two-variables/finding-x-intercept/problems/',
  '/algebra/linear-equations-in-two-variables/finding-x-intercept/answers/',
  '/algebra/linear-equations-in-two-variables/finding-y-intercept/explanation/',
  '/algebra/linear-equations-in-two-variables/finding-y-intercept/problems/',
  '/algebra/linear-equations-in-two-variables/finding-y-intercept/answers/',
  '/algebra/linear-equations-in-two-variables/finding-both-intercepts/explanation/',
  '/algebra/linear-equations-in-two-variables/finding-both-intercepts/problems/',
  '/algebra/linear-equations-in-two-variables/finding-both-intercepts/answers/',
  '/algebra/linear-functions/function-notation-for-linear-functions/explanation/'
]);
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const schedule=original.filter(r=>!completedRoutes.has(r.route));
  const removed=original.length-schedule.length;
  const interval=12*60*1000;
  const start=Math.ceil((Date.now()+60*1000)/interval)*interval;
  function cairoParts(ms){
    const d=new Date(ms);
    const date=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',month:'long',day:'numeric',year:'numeric'}).format(d);
    const time=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);
    const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');
    return{date,time,isoLocal};
  }
  schedule.forEach((r,i)=>{
    const ms=start+i*interval,p=cairoParts(ms);
    r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';
    const f=path.join(dist,r.route.replace(/^\//,''),'index.html');
    if(fs.existsSync(f)){
      let h=fs.readFileSync(f,'utf8');
      h=h.replace(/(<small>Scheduled release<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.date}$2`)
         .replace(/(<small>Cairo time \(UTC\+3\)<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.time}$2`);
      fs.writeFileSync(f,h);
    }
  });
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csvHeader='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';const csv=csvHeader+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);
  const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)){
    const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
    audit.completedContentPages=(audit.completedContentPages||0)+removed;
    audit.scheduledPages=schedule.length;
    audit.firstRelease=schedule.length?`${cairoParts(start).isoLocal}+03:00 Africa/Cairo`:null;
    audit.lastRelease=schedule.length?`${cairoParts(start+(schedule.length-1)*interval).isoLocal}+03:00 Africa/Cairo`:null;
    fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));
  }
}
