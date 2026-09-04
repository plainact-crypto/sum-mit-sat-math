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
fs.copyFileSync(path.join(root,'availability-ui.js'),path.join(dist,'availability-ui.js'));
const index=path.join(dist,'index.html');
let html=fs.readFileSync(index,'utf8');
const src='/sum-mit-sat-math/availability-ui.js';
if(!html.includes('availability-ui.js'))html=html.replace('</body>',`<script src="${src}"></script></body>`);
fs.writeFileSync(index,html);
console.log(`Lesson availability generated for ${rows.length} lessons.`);
