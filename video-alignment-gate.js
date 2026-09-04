const fs=require('fs');
const path=require('path');
const registry=require('./explanation-retrofit-registry');
const dist=path.join(__dirname,'dist');
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==='index.html')out.push(p)}return out}
const byTitle=new Map(registry.map(e=>[e.lesson,e]));
let checked=0;
for(const file of walk(dist)){const h=fs.readFileSync(file,'utf8');if(!h.includes('Video Explanation · English')||!h.includes('summit-native-player'))continue;const m=h.match(/<div class="lesson-title">([^<]+)<\/div>/);if(!m)throw new Error(`Native video missing lesson title: ${file}`);const entry=byTitle.get(m[1]);if(!entry)throw new Error(`Native video lesson is outside Explanation registry: ${m[1]}`);const needD=entry.classification==='DESMOS'||entry.classification==='BOTH';const needG=entry.classification==='GRAPH'||entry.classification==='BOTH';if(needD&&!h.includes('data-desmos-aligned="true"'))throw new Error(`${m[1]} native video must include narrated Desmos strategy`);if(needG&&!h.includes('data-graph-aligned="true"'))throw new Error(`${m[1]} native video must include verified graph scene`);const arr=h.match(/const tracks=(\[[^;]+?\]),scenes=(\[[^;]+?\]),player=/s);if(!arr)throw new Error(`${m[1]} video arrays missing`);const tracks=JSON.parse(arr[1]),scenes=JSON.parse(arr[2]);if(tracks.length!==scenes.length)throw new Error(`${m[1]} track/scene mismatch after alignment`);checked++}
console.log(`Video alignment gate PASS: ${checked} current native English videos aligned with their Explanation classification.`);
