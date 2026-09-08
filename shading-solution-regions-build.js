const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'shading-solution-regions-explanation.html');
if(!fs.existsSync(source))throw new Error('Missing shading-solution-regions-explanation.html');
const route='/algebra/linear-inequalities/shading-solution-regions/explanation/';
const target=path.join(dist,route.replace(/^\//,''));
fs.mkdirSync(target,{recursive:true});
fs.copyFileSync(source,path.join(target,'index.html'));
const schedulePath=path.join(dist,'schedule.json');
function cairoParts(ms){const d=new Date(ms);const isoLocal=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(d).replace(', ','T');return{isoLocal}}
if(fs.existsSync(schedulePath)){
 const original=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
 const schedule=original.filter(r=>r.route!==route);
 const removed=original.length-schedule.length;
 const interval=20*60*1000,start=Math.ceil((Date.now()+60*1000)/interval)*interval;
 schedule.forEach((r,i)=>{r.index=i+1;r.cairo=`${cairoParts(start+i*interval).isoLocal}+03:00`;r.timezone='Africa/Cairo'});
 fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
 const q=v=>`"${String(v??'').replace(/"/g,'""')}"`,head='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';
 fs.writeFileSync(path.join(dist,'schedule.csv'),head+schedule.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n');
 const auditPath=path.join(dist,'audit.json');if(fs.existsSync(auditPath)&&removed){const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));audit.completedContentPages=(audit.completedContentPages||0)+removed;audit.scheduledPages=schedule.length;audit.contentSlotMinutes=20;fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));}
}
