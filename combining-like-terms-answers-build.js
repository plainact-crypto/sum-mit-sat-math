const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const route='/advanced-math/equivalent-expressions/combining-like-terms/answers/';
const target=path.join(dist,route.replace(/^\//,''));
fs.mkdirSync(target,{recursive:true});
fs.copyFileSync(path.join(root,'combining-like-terms-answers.html'),path.join(target,'index.html'));
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const schedule=original.filter(r=>r.route!==route);
  const removed=original.length-schedule.length;
  const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
  const cairoParts=ms=>{const d=new Date(ms),date=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',month:'long',day:'numeric',year:'numeric'}).format(d),time=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Cairo',hour:'numeric',minute:'2-digit',hour12:true}).format(d),isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{date,time,isoLocal}};
  schedule.forEach((r,i)=>{const p=cairoParts(start+i*interval);r.index=i+1;r.cairo=`${p.isoLocal}+03:00`;r.timezone='Africa/Cairo';const f=path.join(dist,r.route.replace(/^\//,''),'index.html');if(fs.existsSync(f)){let h=fs.readFileSync(f,'utf8');h=h.replace(/(<small>Scheduled release<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.date}$2`).replace(/(<small>Cairo time \(UTC\+3\)<\/small><strong>)[^<]*(<\/strong>)/,`$1${p.time}$2`);fs.writeFileSync(f,h)}});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,header='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';fs.writeFileSync(path.join(dist,'schedule.csv'),header+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');
  const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)){const a=JSON.parse(fs.readFileSync(auditPath,'utf8'));a.completedContentPages=(a.completedContentPages||0)+removed;a.scheduledPages=schedule.length;a.contentSlotMinutes=20;fs.writeFileSync(auditPath,JSON.stringify(a,null,2))}
}
console.log('Built Combining Like Terms answers.');