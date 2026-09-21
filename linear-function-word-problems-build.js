const fs=require('fs'),path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const base=path.join(dist,'algebra','linear-functions','linear-function-word-problems');
for(const type of ['problems','answers','test']){const dir=path.join(base,type);fs.mkdirSync(dir,{recursive:true});fs.copyFileSync(path.join(root,`linear-function-word-problems-${type}.html`),path.join(dir,'index.html'));}
const routes=new Set(['/algebra/linear-functions/linear-function-word-problems/explanation/','/algebra/linear-functions/linear-function-word-problems/problems/','/algebra/linear-functions/linear-function-word-problems/answers/','/algebra/linear-functions/linear-function-word-problems/test/']);
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){const old=JSON.parse(fs.readFileSync(schedulePath,'utf8'));const next=old.filter(x=>!routes.has(x.route));fs.writeFileSync(schedulePath,JSON.stringify(next,null,2));const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;const csv='index,subject,section,group,lesson,pageType,route,cairo,timezone\n'+next.map((r,i)=>[i+1,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';fs.writeFileSync(path.join(dist,'schedule.csv'),csv);}
