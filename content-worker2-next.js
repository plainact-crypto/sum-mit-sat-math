require('./content-worker2-next-pre-one-real');
const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const items=[
  {route:'/advanced-math/quadratic-equations/one-real-solution/explanation/',source:'one-real-solution-explanation.html'},
  {route:'/advanced-math/quadratic-equations/one-real-solution/answers/',source:'one-real-solution-answers.html'},
  {route:'/advanced-math/quadratic-equations/two-real-solutions/problems/',source:'two-real-solutions-problems.html'},
  {route:'/advanced-math/quadratic-equations/two-real-solutions/answers/',source:'two-real-solutions-answers.html'},
  {route:'/advanced-math/quadratic-equations/two-real-solutions/test/',source:'two-real-solutions-test.html'},
  {route:'/advanced-math/quadratic-equations/two-real-solutions/explanation/',source:'two-real-solutions-explanation.html'},
  {route:'/advanced-math/quadratic-equations/no-real-solutions/problems/',source:'no-real-solutions-problems.html'},
  {route:'/advanced-math/quadratic-equations/no-real-solutions/answers/',source:'no-real-solutions-answers.html'},
  {route:'/advanced-math/quadratic-equations/no-real-solutions/test/',source:'no-real-solutions-test.html'},
  {route:'/advanced-math/quadratic-equations/no-real-solutions/explanation/',source:'no-real-solutions-explanation.html'}
];
const completedRoutes=new Set();
for(const item of items){const src=path.join(root,item.source),target=path.join(dist,item.route.replace(/^\//,''));if(fs.existsSync(src)){fs.mkdirSync(target,{recursive:true});fs.copyFileSync(src,path.join(target,'index.html'));completedRoutes.add(item.route);}}
const schedulePath=path.join(dist,'schedule.json');
function cairoParts(ms){const d=new Date(ms);const date=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',month:'long',day:'numeric',year:'numeric'}).format(d);const time=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{date,time,isoLocal}}
if(fs.existsSync(schedulePath)){let schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(r=>!completedRoutes.has(r.route));const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;schedule.forEach((r,i)=>{const p=cairoParts(start+i*interval);r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';const f=path.join(dist,r.route.replace(/^\//,''),'index.html');if(fs.existsSync(f)){let h=fs.readFileSync(f,'utf8');h=h.replace(/(<small>Scheduled release<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.date}$2`).replace(/(<small>Cairo time \(UTC\+3\)<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.time}$2`);fs.writeFileSync(f,h);}});fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,head='index,subject,section,group,lesson,pageType,route,cairo,timezone\n',csv=head+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);}
require('./quadratic-formula-test-build');
require('./video-quadratic-formula-explainer');
require('./sum-of-roots-test-build');
require('./video-sum-of-roots-explainer');
require('./quadratic-parameters-full-build');
require('./product-of-roots-content-build');
require('./video-product-of-roots-explainer');
