const fs=require('fs');
const path=require('path');
const root=__dirname;
const dist=path.join(root,'dist');
const items=[
  {source:'quadratic-formula-problems.html',route:'/advanced-math/quadratic-equations/quadratic-formula/problems/',leaf:'problems',qa:html=>(html.match(/class="question"/g)||[]).length===18},
  {source:'quadratic-formula-answers.html',route:'/advanced-math/quadratic-equations/quadratic-formula/answers/',leaf:'answers',qa:html=>html.includes('Answers must match current Problems 3/8/5/2')}
];
for(const item of items){
  const source=path.join(root,item.source);
  if(!fs.existsSync(source)) throw new Error('Missing Quadratic Formula source: '+item.source);
  const html=fs.readFileSync(source,'utf8');
  if(!item.qa(html)) throw new Error('Quadratic Formula QA failed: '+item.source);
  const target=path.join(dist,'advanced-math','quadratic-equations','quadratic-formula',item.leaf);
  fs.mkdirSync(target,{recursive:true});
  fs.copyFileSync(source,path.join(target,'index.html'));
}
const schedulePath=path.join(dist,'schedule.json');
if(fs.existsSync(schedulePath)){
  const published=new Set(items.map(x=>x.route));
  const schedule=JSON.parse(fs.readFileSync(schedulePath,'utf8')).filter(item=>!published.has(item.route));
  const slotMs=20*60*1000;
  const start=Math.ceil((Date.now()+60000)/slotMs)*slotMs;
  const cairo=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');
  schedule.forEach((item,index)=>{item.index=index+1;item.cairo=cairo(start+index*slotMs)+'+03:00';item.timezone='Africa/Cairo';});
  fs.writeFileSync(schedulePath,JSON.stringify(schedule,null,2));
}
console.log('Built Quadratic Formula problems + answers routes');