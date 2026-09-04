const fs=require('fs');
const path=require('path');
const registry=require('./explanation-retrofit-registry');
const tools=require('./explanation-tools');
const dist=path.join(__dirname,'dist');
if(!fs.existsSync(dist)) throw new Error('dist missing');
const escAttr=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function walk(dir,out=[]){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())walk(p,out);else if(e.name==='index.html')out.push(p)}return out}
const pages=walk(dist).map(file=>({file,html:fs.readFileSync(file,'utf8')})).filter(x=>/page-type\">Explanation</.test(x.html));
function findPage(lesson){const exact=`<div class="lesson-title">${lesson}</div>`;const hits=pages.filter(x=>x.html.includes(exact));if(hits.length!==1)throw new Error(`Expected exactly one Explanation route for ${lesson}; found ${hits.length}`);return hits[0]}
function graphSection(entry){tools.verifyGraphSpec(entry.graph);const json=escAttr(JSON.stringify(entry.graph));return `<section class="lesson-section summit-visual-strategy" data-retrofit-graph="true"><span class="section-kicker">VISUAL GRAPH</span><h2>See the mathematics on the coordinate plane.</h2><div data-summit-graph="${json}"></div><p class="tip-line"><b>Graph QA:</b> Coordinates and features are generated from the verified mathematical specification, not from an image.</p></section>`}
function insertionPoint(html){const k=html.indexOf('COMMON MISTAKES');if(k>=0){const s=html.lastIndexOf('<section',k);if(s>=0)return s}const a=html.indexOf('</article>');if(a>=0)return a;throw new Error('Explanation article end not found')}
let done=0;
for(const entry of registry){
 const page=findPage(entry.lesson);let h=page.html;
 const marker=`<!-- SUMMIT_RETROFIT:${entry.slug}:${entry.classification} -->`;
 if(!h.includes(marker))h=h.replace('<article class="lesson-content">',`<article class="lesson-content">${marker}`);
 let blocks='';
 if(entry.classification==='GRAPH'||entry.classification==='BOTH'){
   if(!entry.graph)throw new Error(`${entry.slug} requires graph but has no graph spec`);
   if(!h.includes('data-retrofit-graph="true"'))blocks+=graphSection(entry);
 }
 if(entry.classification==='DESMOS'||entry.classification==='BOTH'){
   if(!entry.desmos)throw new Error(`${entry.slug} requires Desmos but has no strategy`);
   // Historical lessons may already contain a hand-authored DESMOS STRATEGY. Keep it; otherwise use the shared component.
   if(!/DESMOS STRATEGY/.test(h))blocks+=tools.desmosStrategyHTML(entry.desmos);
 }
 if(blocks){const at=insertionPoint(h);h=h.slice(0,at)+blocks+h.slice(at)}
 fs.writeFileSync(page.file,h);page.html=h;done++;
}
console.log(`Retrofitted ${done}/${registry.length} Explanation routes with Graph/Desmos requirements.`);
