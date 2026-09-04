const fs=require('fs');
const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const schedule=JSON.parse(fs.readFileSync(path.join(dist,'schedule.json'),'utf8'));
const byBase=new Map();
for(const row of schedule){
  const base=row.route.replace(/\/(explanation|problems|answers)\/$/,'/');
  if(!byBase.has(base))byBase.set(base,{base,scheduledComplete:null});
  const rec=byBase.get(base);
  if(!rec.scheduledComplete||new Date(row.cairo)>new Date(rec.scheduledComplete))rec.scheduledComplete=row.cairo;
}
function ready(route){
  const f=path.join(dist,route.replace(/^\//,''),'index.html');
  if(!fs.existsSync(f))return false;
  const h=fs.readFileSync(f,'utf8');
  return !/COMING SOON|Scheduled release/i.test(h);
}
const rows=[];
for(const rec of byBase.values()){
  const states={
    explanation:ready(rec.base+'explanation/'),
    practice:ready(rec.base+'problems/'),
    answers:ready(rec.base+'answers/'),
    test:ready(rec.base+'test/')
  };
  const count=Object.values(states).filter(Boolean).length;
  rows.push({...rec,states,readyCount:count,total:4,complete:count===4});
}
fs.writeFileSync(path.join(dist,'lesson-availability.json'),JSON.stringify(rows,null,2));

// Runtime availability UI is intentionally disabled on the home page.
// It caused mobile browsers to become unresponsive. Keep the data file only;
// availability badges will be rendered statically in a later build step.
const index=path.join(dist,'index.html');
if(fs.existsSync(index)){
  let html=fs.readFileSync(index,'utf8');
  html=html.replace(/<script[^>]+availability-ui\.js[^>]*><\/script>/gi,'');
  fs.writeFileSync(index,html);
}
console.log(`Lesson availability data generated for ${rows.length} lessons; runtime UI disabled.`);
