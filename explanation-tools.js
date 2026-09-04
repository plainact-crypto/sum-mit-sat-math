/* SUMMIT MATH reusable Explanation tools: deterministic SVG graphs + Desmos Strategy UI. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  root.SummitExplanationTools=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const EPS=1e-9;
  const finite=n=>Number.isFinite(Number(n));
  const nearly=(a,b,t=1e-7)=>Math.abs(Number(a)-Number(b))<=t;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function normalizeBounds(bounds={}){
    const xMin=finite(bounds.xMin)?Number(bounds.xMin):-10;
    const xMax=finite(bounds.xMax)?Number(bounds.xMax):10;
    const yMin=finite(bounds.yMin)?Number(bounds.yMin):-10;
    const yMax=finite(bounds.yMax)?Number(bounds.yMax):10;
    if(!(xMin<xMax&&yMin<yMax)) throw new Error('Invalid graph bounds');
    return {xMin,xMax,yMin,yMax};
  }
  function linearY(m,b,x){return Number(m)*Number(x)+Number(b)}
  function linearXIntercept(m,b){m=Number(m);b=Number(b);return Math.abs(m)<EPS?null:-b/m}
  function intersection(l1,l2){
    const m1=Number(l1.m),b1=Number(l1.b),m2=Number(l2.m),b2=Number(l2.b);
    if(nearly(m1,m2)) return null;
    const x=(b2-b1)/(m1-m2); return {x,y:linearY(m1,b1,x)};
  }
  function verifyLinearSpec(line){
    if(!line||!finite(line.m)||!finite(line.b)) throw new Error('Linear graph requires finite m and b');
    const m=Number(line.m),b=Number(line.b);
    const xs=Array.isArray(line.qaX)&&line.qaX.length>=3?line.qaX.slice(0,3).map(Number):[-1,0,1];
    const points=xs.map(x=>({x,y:linearY(m,b,x)}));
    for(const p of points) if(!nearly(p.y,m*p.x+b)) throw new Error('Linear substitution QA failed');
    if(line.yIntercept!=null && !nearly(Number(line.yIntercept),b)) throw new Error('Y-intercept QA failed');
    if(line.xIntercept!=null){
      const expected=linearXIntercept(m,b);
      if(expected===null||!nearly(Number(line.xIntercept),expected)) throw new Error('X-intercept QA failed');
    }
    return {m,b,points,yIntercept:b,xIntercept:linearXIntercept(m,b)};
  }
  function verifyGraphSpec(spec){
    if(!spec||typeof spec!=='object') throw new Error('Graph spec must be an object');
    normalizeBounds(spec.bounds);
    const lines=Array.isArray(spec.lines)?spec.lines:[];
    const verticals=Array.isArray(spec.verticals)?spec.verticals:[];
    if(!lines.length&&!verticals.length) throw new Error('Graph needs at least one line');
    const verifiedLines=lines.map(verifyLinearSpec);
    for(const v of verticals) if(!finite(v.x)) throw new Error('Vertical line requires finite x');
    if(Array.isArray(spec.intersections)){
      for(const item of spec.intersections){
        const a=Number(item.a),b=Number(item.b);
        if(!Number.isInteger(a)||!Number.isInteger(b)||!lines[a]||!lines[b]) throw new Error('Intersection references invalid lines');
        const hit=intersection(lines[a],lines[b]);
        if(!hit) throw new Error('Expected intersection but lines are parallel/coincident');
        if(item.x!=null&&!nearly(item.x,hit.x)) throw new Error('Intersection x QA failed');
        if(item.y!=null&&!nearly(item.y,hit.y)) throw new Error('Intersection y QA failed');
      }
    }
    if(Array.isArray(spec.points)){
      for(const p of spec.points){
        if(!finite(p.x)||!finite(p.y)) throw new Error('Point coordinates must be finite');
        if(Number.isInteger(p.line)&&lines[p.line]){
          const l=lines[p.line];
          if(!nearly(Number(p.y),linearY(l.m,l.b,p.x))) throw new Error('Labeled point is not on declared line');
        }
      }
    }
    return {lines:verifiedLines,verticals};
  }
  function renderGraph(el,spec){
    verifyGraphSpec(spec);
    const B=normalizeBounds(spec.bounds),W=720,H=440,pad=42;
    const sx=x=>pad+(Number(x)-B.xMin)/(B.xMax-B.xMin)*(W-2*pad);
    const sy=y=>H-pad-(Number(y)-B.yMin)/(B.yMax-B.yMin)*(H-2*pad);
    const parts=[];
    parts.push(`<svg class="summit-graph-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.ariaLabel||'Mathematical graph')}">`);
    for(let x=Math.ceil(B.xMin);x<=Math.floor(B.xMax);x++) parts.push(`<line class="sg-grid" x1="${sx(x)}" y1="${pad}" x2="${sx(x)}" y2="${H-pad}"/>`);
    for(let y=Math.ceil(B.yMin);y<=Math.floor(B.yMax);y++) parts.push(`<line class="sg-grid" x1="${pad}" y1="${sy(y)}" x2="${W-pad}" y2="${sy(y)}"/>`);
    if(B.yMin<=0&&B.yMax>=0) parts.push(`<line class="sg-axis" x1="${pad}" y1="${sy(0)}" x2="${W-pad}" y2="${sy(0)}"/>`);
    if(B.xMin<=0&&B.xMax>=0) parts.push(`<line class="sg-axis" x1="${sx(0)}" y1="${pad}" x2="${sx(0)}" y2="${H-pad}"/>`);
    (spec.lines||[]).forEach((l,i)=>{
      const x1=B.xMin,x2=B.xMax,y1=linearY(l.m,l.b,x1),y2=linearY(l.m,l.b,x2);
      parts.push(`<line class="sg-function sg-function-${i%4}" x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}"/>`);
    });
    (spec.verticals||[]).forEach((v,i)=>parts.push(`<line class="sg-function sg-function-${i%4}" x1="${sx(v.x)}" y1="${pad}" x2="${sx(v.x)}" y2="${H-pad}"/>`));
    (spec.points||[]).forEach(p=>{parts.push(`<circle class="sg-point" cx="${sx(p.x)}" cy="${sy(p.y)}" r="5"/>`);if(p.label)parts.push(`<text class="sg-label" x="${sx(p.x)+8}" y="${sy(p.y)-8}">${esc(p.label)}</text>`)});
    parts.push('</svg>');
    if(spec.caption) parts.push(`<div class="summit-graph-caption">${esc(spec.caption)}</div>`);
    el.classList.add('summit-graph'); el.innerHTML=parts.join('');
  }
  function desmosStrategyHTML(d){
    const req=['enter','lookFor','useIt','why','faster'];
    for(const k of req) if(!d||!String(d[k]??'').trim()) throw new Error(`Desmos strategy missing ${k}`);
    return `<section class="lesson-section summit-desmos" data-summit-desmos="true"><span class="section-kicker">DESMOS STRATEGY</span><h2>${esc(d.title||'Use Desmos when it gives you a real advantage.')}</h2><div class="summit-desmos-grid"><div><h3>Enter</h3><p>${esc(d.enter)}</p></div><div><h3>Look for</h3><p>${esc(d.lookFor)}</p></div><div><h3>Use it to answer</h3><p>${esc(d.useIt)}</p></div><div><h3>Why it works</h3><p>${esc(d.why)}</p></div></div><div class="check-box"><b>Faster or not?</b><span>${esc(d.faster)}</span></div>${d.crossCheck?`<p class="tip-line"><b>Math cross-check:</b> ${esc(d.crossCheck)}</p>`:''}</section>`;
  }
  function mount(){
    document.querySelectorAll('[data-summit-graph]').forEach(el=>{
      if(el.dataset.summitGraphMounted==='1') return;
      try{const raw=el.getAttribute('data-summit-graph');renderGraph(el,JSON.parse(raw));el.dataset.summitGraphMounted='1'}catch(e){el.innerHTML='<div class="summit-graph-error">Graph unavailable: validation failed.</div>';console.error('[SUMMIT graph]',e)}
    });
  }
  if(typeof document!=='undefined') document.addEventListener('DOMContentLoaded',mount);
  return {nearly,linearY,linearXIntercept,intersection,verifyLinearSpec,verifyGraphSpec,renderGraph,desmosStrategyHTML,mount};
});
