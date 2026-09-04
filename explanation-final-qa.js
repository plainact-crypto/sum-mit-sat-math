const fs=require('fs');
const path=require('path');
const registry=require('./explanation-retrofit-registry');
const tools=require('./explanation-tools');
const root=__dirname,dist=path.join(root,'dist');
function fail(m){throw new Error(`[Final Explanation QA] ${m}`)}
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==='index.html')out.push(p)}return out}
if(!fs.existsSync(dist))fail('dist missing');
const pages=walk(dist).map(file=>({file,html:fs.readFileSync(file,'utf8')}));
const explanations=pages.filter(p=>/page-type\">Explanation</.test(p.html)&&p.html.includes('lesson-content'));
if(registry.length!==36)fail(`Registry expected 36 entries, found ${registry.length}`);
if(explanations.length!==registry.length)fail(`Published Explanation count ${explanations.length} != registry ${registry.length}`);
const counts={BOTH:0,GRAPH:0,DESMOS:0,NEITHER:0};
const seen=new Set();
for(const e of registry){
 if(seen.has(e.slug))fail(`Duplicate slug ${e.slug}`);seen.add(e.slug);
 if(!(e.classification in counts))fail(`Invalid classification ${e.classification} for ${e.slug}`);counts[e.classification]++;
 const marker=`SUMMIT_RETROFIT:${e.slug}:${e.classification}`;
 const hits=explanations.filter(p=>p.html.includes(marker));
 if(hits.length!==1)fail(`${e.slug}: expected one classified built route, found ${hits.length}`);
 const h=hits[0].html;
 const graphCount=(h.match(/data-retrofit-graph="true"/g)||[]).length;
 const desmosCount=(h.match(/DESMOS STRATEGY/gi)||[]).length;
 const needGraph=e.classification==='GRAPH'||e.classification==='BOTH';
 const needDesmos=e.classification==='DESMOS'||e.classification==='BOTH';
 if(needGraph){if(!e.graph)fail(`${e.slug}: missing graph spec`);tools.verifyGraphSpec(e.graph);if(graphCount!==1)fail(`${e.slug}: expected exactly one verified graph block, found ${graphCount}`)}
 else if(graphCount>0)fail(`${e.slug}: unexpected retrofit graph block`);
 if(needDesmos){if(!e.desmos)fail(`${e.slug}: missing Desmos spec`);for(const k of ['enter','lookFor','useIt','why','faster'])if(!String(e.desmos[k]||'').trim())fail(`${e.slug}: Desmos missing ${k}`);if(desmosCount!==1)fail(`${e.slug}: expected exactly one Desmos Strategy, found ${desmosCount}`)}
 else if(desmosCount>0)fail(`${e.slug}: unexpected Desmos Strategy`);
 if(!h.includes('/explanation-tools.css')||!h.includes('/explanation-tools.js'))fail(`${e.slug}: shared Explanation assets missing`);
 if(/Graph unavailable: validation failed\./.test(h))fail(`${e.slug}: graph validation error rendered`);
}
if(counts.BOTH!==30||counts.DESMOS!==6||counts.GRAPH!==0||counts.NEITHER!==0)fail(`Classification totals changed: ${JSON.stringify(counts)}`);
const css=fs.readFileSync(path.join(root,'explanation-tools.css'),'utf8');
if(!css.includes('.summit-graph-svg{display:block;width:100%;height:auto}'))fail('Responsive SVG rule missing');
if(!/@media\(max-width:680px\)/.test(css))fail('Mobile Explanation breakpoint missing');
const videoPages=pages.filter(p=>p.html.includes('Video Explanation · English')&&p.html.includes('summit-native-player'));
if(videoPages.length!==3)fail(`Expected 3 current native English videos, found ${videoPages.length}`);
for(const p of videoPages){if(!p.html.includes('data-desmos-aligned="true"'))fail(`Video Desmos alignment missing: ${p.file}`);const m=p.html.match(/const tracks=(\[[^;]+?\]),scenes=(\[[^;]+?\]),player=/s);if(!m)fail(`Video arrays missing: ${p.file}`);const tracks=JSON.parse(m[1]),scenes=JSON.parse(m[2]);if(tracks.length!==scenes.length)fail(`Video track/scene mismatch: ${p.file}`);if(!scenes.some(s=>Array.isArray(s)&&String(s[0]).toUpperCase()==='DESMOS STRATEGY'))fail(`Video Desmos scene missing: ${p.file}`)}
console.log(JSON.stringify({finalExplanationQA:'PASS',publishedExplanations:explanations.length,classifications:counts,verifiedGraphLessons:counts.BOTH+counts.GRAPH,verifiedDesmosLessons:counts.BOTH+counts.DESMOS,nativeEnglishVideos:videoPages.length,videoAlignment:'PASS',responsiveGraphAndDesmosUI:'PASS',remaining:0},null,2));
