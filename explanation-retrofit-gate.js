const fs=require('fs');
const path=require('path');
const registry=[...require('./explanation-retrofit-registry'),...require('./explanation-content-registry')];
const tools=require('./explanation-tools');
const root=__dirname;
const dist=path.join(root,'dist');
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==='index.html')out.push(p)}return out}
const published=walk(dist).map(file=>({file,html:fs.readFileSync(file,'utf8')})).filter(x=>/page-type\">Explanation</.test(x.html)&&x.html.includes('lesson-content'));
const seen=new Set();
function fail(m){throw new Error(`[Explanation retrofit gate] ${m}`)}
function sourceMeta(entry){const f=path.join(root,`${entry.slug}-explanation.html`);if(!fs.existsSync(f))return {lesson:entry.lesson,crumb:null};const h=fs.readFileSync(f,'utf8');const tm=h.match(/<div class="lesson-title">([^<]+)<\/div>/);if(!tm)fail(`Source lesson title missing for ${entry.slug}`);const cm=h.match(/<div class="crumb">([^<]+)<\/div>/);return {lesson:tm[1],crumb:cm?cm[1]:null}}
function pageFor(entry){const meta=sourceMeta(entry),exact=`<div class="lesson-title">${meta.lesson}</div>`;const hits=published.filter(x=>x.html.includes(exact));if(meta.crumb){const crumbExact=`<div class="crumb">${meta.crumb}</div>`;const crumbHits=hits.filter(x=>x.html.includes(crumbExact));if(crumbHits.length===1)return crumbHits[0]}const suffix=`/${entry.slug}/explanation/index.html`;const routeHits=hits.filter(x=>x.file.replace(/\\/g,'/').endsWith(suffix));if(routeHits.length===1)return routeHits[0];if(hits.length===1)return hits[0];fail(`Expected one published Explanation for ${entry.slug} / ${meta.lesson}; title hits ${hits.length}, slug hits ${routeHits.length}`)}
function special(entry){const g=entry.graph;if(!g)return;
 if(entry.slug==='parallel-lines'){if(g.lines.length!==2||!tools.nearly(g.lines[0].m,g.lines[1].m)||tools.nearly(g.lines[0].b,g.lines[1].b))fail('Parallel Lines graph must have equal slopes and different intercepts')}
 if(entry.slug==='perpendicular-lines'){if(g.lines.length!==2||!tools.nearly(Number(g.lines[0].m)*Number(g.lines[1].m),-1))fail('Perpendicular Lines slopes must multiply to -1')}
 if(entry.slug==='undefined-slope'){if(!g.verticals||g.verticals.length<1)fail('Undefined Slope must use a vertical line')}
 if(entry.slug==='zero-slope'){if(!g.lines||!tools.nearly(g.lines[0].m,0))fail('Zero Slope must render m=0')}
 if(entry.slug==='linear-function-translations'){if(g.lines.length!==2||!tools.nearly(g.lines[0].m,g.lines[1].m))fail('Translation example must preserve slope')}
 if(['finding-x-intercept','finding-both-intercepts','standard-form'].includes(entry.slug)){if(g.lines&&g.lines[0]&&g.lines[0].xIntercept==null)fail(`${entry.slug} must declare verified x-intercept`)}
 if(['finding-y-intercept','finding-both-intercepts','y-intercept-as-initial-value','slope-intercept-form'].includes(entry.slug)){if(g.lines&&g.lines[0]&&g.lines[0].yIntercept==null)fail(`${entry.slug} must declare verified y-intercept`)}
}
for(const entry of registry){if(seen.has(entry.slug))fail(`Duplicate registry slug ${entry.slug}`);seen.add(entry.slug);if(!['BOTH','GRAPH','DESMOS','NEITHER'].includes(entry.classification))fail(`Invalid classification for ${entry.slug}`);const p=pageFor(entry),h=p.html;if(!h.includes(`SUMMIT_RETROFIT:${entry.slug}:${entry.classification}`))fail(`${entry.slug} missing classification marker`);const needGraph=entry.classification==='GRAPH'||entry.classification==='BOTH';const needDesmos=entry.classification==='DESMOS'||entry.classification==='BOTH';if(needGraph){if(!entry.graph)fail(`${entry.slug} graph required but spec missing`);tools.verifyGraphSpec(entry.graph);special(entry);if(!h.includes('data-retrofit-graph="true"'))fail(`${entry.slug} graph required but not injected`)}if(needDesmos){if(!entry.desmos)fail(`${entry.slug} Desmos required but strategy missing`);for(const k of ['enter','lookFor','useIt','why','faster'])if(!String(entry.desmos[k]||'').trim())fail(`${entry.slug} Desmos missing ${k}`);if(!h.includes('DESMOS STRATEGY'))fail(`${entry.slug} Desmos required but not injected`)}}
const allowedTitles=new Set(registry.map(e=>sourceMeta(e).lesson));for(const p of published){const m=p.html.match(/<div class="lesson-title">([^<]+)<\/div>/);const title=m&&m[1];if(title&&!allowedTitles.has(title))fail(`Published Explanation is outside classification registry: ${title}`)}
if(published.length!==registry.length)fail(`Published Explanation count ${published.length} does not match retrofit registry ${registry.length}`);
console.log(`Explanation retrofit gate PASS: ${published.length} published Explanations classified, upgraded, and protected.`);
