const fs=require('fs');
const path=require('path');
const root=__dirname,dist=path.join(root,'dist');
const source=path.join(root,'sum-of-roots-explanation.html');
const route='/advanced-math/quadratic-equations/sum-of-roots/explanation/';
if(!fs.existsSync(source)) throw new Error('Missing Sum of Roots explanation source');
let html=fs.readFileSync(source,'utf8');
for(const marker of ['EXPLANATION_CLASSIFICATION: DESMOS_USEFUL','DESMOS STRATEGY','<small>Enter</small>','<small>Look for</small>','<small>Use it to answer</small>','<small>Why it works</small>','<small>Faster or not?</small>']) if(!html.includes(marker)) throw new Error('Sum of Roots Explanation marker missing: '+marker);
for(const check of ['At x=2','At x=5','Their sum is 7','k=−12']) if(!html.includes(check)) throw new Error('Sum of Roots math cross-check missing: '+check);
const qaMarker='<!-- SUMMIT_RETROFIT:sum-of-roots:DESMOS -->';
if(!html.includes(qaMarker)) html=html.replace('<article class="lesson-content">','<article class="lesson-content">'+qaMarker);
if(!html.includes('/explanation-tools.css')) html=html.replace('</head>','<link rel="stylesheet" href="/explanation-tools.css"></head>');
if(!html.includes('/explanation-tools.js')) html=html.replace('</body>','<script src="/explanation-tools.js"></script></body>');
const target=path.join(dist,route.replace(/^\//,''));fs.mkdirSync(target,{recursive:true});fs.writeFileSync(path.join(target,'index.html'),html);
const sp=path.join(dist,'schedule.json');
if(fs.existsSync(sp)){const s=JSON.parse(fs.readFileSync(sp,'utf8')).filter(x=>x.route!==route),slot=20*60*1000,start=Math.ceil((Date.now()+60000)/slot)*slot,cairo=ms=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Cairo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(ms)).replace(', ','T');s.forEach((x,i)=>{x.index=i+1;x.cairo=cairo(start+i*slot)+'+03:00';x.timezone='Africa/Cairo'});fs.writeFileSync(sp,JSON.stringify(s,null,2));}
console.log('Built Sum of Roots explanation route: DESMOS_USEFUL; graph no; Desmos yes; math cross-check PASS');
