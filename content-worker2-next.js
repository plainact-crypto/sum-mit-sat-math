const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const items=[
  {route:'algebra/systems-of-linear-equations/one-solution/explanation/',source:'one-solution-explanation.html'},
  {route:'algebra/systems-of-linear-equations/infinitely-many-solutions/explanation/',source:'infinitely-many-solutions-explanation.html'},
  {route:'algebra/systems-of-linear-equations/infinitely-many-solutions/problems/',source:'infinitely-many-solutions-problems.html'},
  {route:'algebra/systems-of-linear-equations/infinitely-many-solutions/answers/',source:'infinitely-many-solutions-answers.html'},
  {route:'algebra/systems-of-linear-equations/no-solution/explanation/',source:'no-solution-explanation.html'},
  {route:'algebra/systems-of-linear-equations/no-solution/test/',source:'no-solution-test.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-substitution/explanation/',source:'solving-by-substitution-explanation.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-substitution/problems/',source:'solving-by-substitution-problems.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-substitution/answers/',source:'solving-by-substitution-answers.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-substitution/test/',source:'solving-by-substitution-test.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-elimination/explanation/',source:'solving-by-elimination-explanation.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-elimination/answers/',source:'solving-by-elimination-answers.html'},
  {route:'algebra/systems-of-linear-equations/solving-by-elimination/test/',source:'solving-by-elimination-test.html'},
  {route:'algebra/systems-of-linear-equations/solving-graphically/problems/',source:'solving-graphically-problems.html'},
  {route:'algebra/systems-of-linear-equations/solving-graphically/answers/',source:'solving-graphically-answers.html'},
  {route:'algebra/systems-of-linear-equations/solving-graphically/test/',source:'solving-graphically-test.html'},
  {route:'algebra/systems-of-linear-equations/solving-from-tables/explanation/',source:'solving-from-tables-explanation.html'},
  {route:'algebra/systems-of-linear-equations/solving-from-tables/problems/',source:'solving-from-tables-problems.html'},
  {route:'algebra/systems-of-linear-equations/solving-from-tables/answers/',source:'solving-from-tables-answers.html'},
  {route:'algebra/systems-of-linear-equations/solving-from-tables/test/',source:'solving-from-tables-test.html'},
  {route:'algebra/systems-of-linear-equations/systems-word-problems/explanation/',source:'systems-word-problems-explanation.html'},
  {route:'algebra/systems-of-linear-equations/systems-word-problems/problems/',source:'systems-word-problems-problems.html'},
  {route:'algebra/systems-of-linear-equations/systems-word-problems/test/',source:'systems-word-problems-test.html'},
  {route:'algebra/linear-inequalities/solving-one-variable-inequalities/problems/',source:'solving-one-variable-inequalities-problems.html'},
  {route:'algebra/linear-inequalities/solving-one-variable-inequalities/answers/',source:'solving-one-variable-inequalities-answers.html'},
  {route:'algebra/linear-inequalities/reversing-the-inequality-sign/problems/',source:'reversing-the-inequality-sign-problems.html'},
  {route:'algebra/linear-inequalities/reversing-the-inequality-sign/answers/',source:'reversing-the-inequality-sign-answers.html'},
  {route:'algebra/linear-inequalities/compound-inequalities/problems/',source:'compound-inequalities-problems.html'},
  {route:'algebra/linear-inequalities/compound-inequalities/answers/',source:'compound-inequalities-answers.html'}
];
const completedRoutes=new Set();
for(const item of items){const source=path.join(root,item.source);if(!fs.existsSync(source))continue;const target=path.join(dist,item.route);fs.mkdirSync(target,{recursive:true});fs.copyFileSync(source,path.join(target,'index.html'));completedRoutes.add(`/${item.route}`)}
const schedulePath=path.join(dist,'schedule.json');
function cairoParts(ms){const d=new Date(ms);const date=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',month:'long',day:'numeric',year:'numeric'}).format(d);const time=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{date,time,isoLocal}}
if(fs.existsSync(schedulePath)){
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const schedule=original.filter(r=>!completedRoutes.has(r.route)),removed=original.length-schedule.length;
  const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
  schedule.forEach((r,i)=>{const ms=start+i*interval,p=cairoParts(ms);r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';const f=path.join(dist,r.route.replace(/^\//,''),'index.html');if(fs.existsSync(f)){let h=fs.readFileSync(f,'utf8');h=h.replace(/(<small>Scheduled release<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.date}$2`).replace(/(<small>Cairo time \(UTC\+3\)<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.time}$2`);fs.writeFileSync(f,h);}});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,csvHeader='index,subject,section,group,lesson,pageType,route,cairo,timezone\n',csv=csvHeader+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);
  const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+removed;audit.scheduledPages=schedule.length;audit.contentSlotMinutes=20;audit.firstRelease=schedule.length?`${cairoParts(start).isoLocal}+03:00 Africa/Cairo`:null;audit.lastRelease=schedule.length?`${cairoParts(start+(schedule.length-1)*interval).isoLocal}+03:00 Africa/Cairo`:null;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}
}
