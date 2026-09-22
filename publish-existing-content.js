const fs=require('fs');
const path=require('path');

const root=__dirname;
const dist=path.join(root,'dist');
const curriculumPath=path.join(dist,'curriculum.json');
const schedulePath=path.join(dist,'schedule.json');

if(!fs.existsSync(curriculumPath)) throw new Error('dist/curriculum.json missing');
const curriculum=JSON.parse(fs.readFileSync(curriculumPath,'utf8'));

const leaves=[];
for(const subject of curriculum){
  for(const section of subject.sections||[]){
    for(const leaf of section.leaves||[]) leaves.push({subject,section,group:null,leaf});
    for(const group of section.groups||[]) for(const leaf of group.leaves||[]) leaves.push({subject,section,group,leaf});
  }
}

const types=['explanation','problems','answers','test'];
const publishedRoutes=new Set();
const copied=[];
const skipped=[];

function normalize(s){return String(s||'').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim().toLowerCase();}
function validSource(html,item,type,file){
  if(/COMING SOON|Content still being completed/i.test(html)) return false;
  const title=normalize(item.leaf.title);
  const subject=normalize(item.subject.title);
  const section=normalize(item.section.title);
  const lower=normalize(html);
  const titleOk=lower.includes(title);
  const subjectOk=lower.includes(subject);
  const sectionOk=lower.includes(section);
  if(!titleOk||!subjectOk||!sectionOk){
    skipped.push({file,reason:'metadata-mismatch',titleOk,subjectOk,sectionOk,target:item.leaf.base,type});
    return false;
  }
  return true;
}

for(const item of leaves){
  const base=String(item.leaf.base||'').replace(/\/$/,'');
  const slug=item.leaf.slug;
  if(!base||!slug) continue;
  for(const type of types){
    const file=`${slug}-${type}.html`;
    const src=path.join(root,file);
    if(!fs.existsSync(src)) continue;
    const html=fs.readFileSync(src,'utf8');
    if(!validSource(html,item,type,file)) continue;
    const target=path.join(dist,base.replace(/^\//,''),type);
    fs.mkdirSync(target,{recursive:true});
    fs.copyFileSync(src,path.join(target,'index.html'));
    const route=`${base}/${type}/`;
    publishedRoutes.add(route);
    copied.push({route,file});
  }
}

if(fs.existsSync(schedulePath)){
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8'));
  const remaining=schedule.filter(r=>!publishedRoutes.has(r.route));
  remaining.forEach((r,i)=>r.index=i+1);
  fs.writeFileSync(schedulePath,JSON.stringify(remaining,null,2));

  const q=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const header='index,subject,section,group,lesson,pageType,route,cairo,timezone\n';
  const csv=header+remaining.map(r=>[r.index,r.subject,r.section,r.group,r.lesson,r.pageType,r.route,r.cairo,r.timezone].map(q).join(',')).join('\n')+'\n';
  fs.writeFileSync(path.join(dist,'schedule.csv'),csv);

  const auditPath=path.join(dist,'audit.json');
  if(fs.existsSync(auditPath)){
    const audit=JSON.parse(fs.readFileSync(auditPath,'utf8'));
    const removed=schedule.length-remaining.length;
    audit.completedContentPages=(audit.completedContentPages||0)+removed;
    audit.scheduledPages=remaining.length;
    audit.autoPublishedExistingContent=copied.length;
    fs.writeFileSync(auditPath,JSON.stringify(audit,null,2));
  }
}

console.log('[publish-existing-content] published '+copied.length+' existing page(s)');
for(const x of copied) console.log('[publish-existing-content] '+x.route+' <- '+x.file);
if(skipped.length){
  console.log('[publish-existing-content] skipped '+skipped.length+' candidate(s) due to metadata mismatch');
  for(const x of skipped) console.log('[publish-existing-content] skipped '+x.file+' for '+x.target+'/'+x.type);
}
