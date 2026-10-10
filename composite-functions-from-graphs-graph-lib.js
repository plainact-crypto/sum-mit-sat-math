'use strict';
const d=require('./composite-functions-from-graphs-lesson-data.json');
const defs={A:{f:x=>x+2,g:x=>2*x-1,F:[-4,4],G:[-4,4]},B:{f:x=>Math.abs(x),g:x=>3-x,F:[-4,4],G:[-4,4]},C:{f:x=>x*x-1,g:x=>-x,F:[-2.5,2.5],G:[-4,4]},D:{f:x=>x+1,g:x=>2-x,F:[-2,1],G:[0,4]}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function graph(id){
 const q=defs[id],X=x=>48+(x+5)*62,Y=y=>343-(y+6)*23;
 const curve=(fn,range,color)=>{let s='';for(let i=0;i<=160;i++){let x=range[0]+(range[1]-range[0])*i/160;s+=(i?'L':'M')+X(x).toFixed(1)+','+Y(fn(x)).toFixed(1)+' '}return '<path d="'+s+'" stroke="'+color+'" stroke-width="3" fill="none"/>'};
 let grid='';for(let x=-5;x<=5;x++)grid+='<line x1="'+X(x)+'" x2="'+X(x)+'" y1="20" y2="343" stroke="#dde4ed"/><text x="'+X(x)+'" y="361" text-anchor="middle" font-size="12">'+x+'</text>';
 for(let y=-6;y<=8;y+=2)grid+='<line x1="48" x2="668" y1="'+Y(y)+'" y2="'+Y(y)+'" stroke="#dde4ed"/><text x="37" y="'+(Y(y)+4)+'" text-anchor="end" font-size="12">'+y+'</text>';
 let ends='';if(id==='D')for(const [fn,r,color] of [[q.f,q.F,'#1261a0'],[q.g,q.G,'#c76a16']])for(const x of r)ends+='<circle cx="'+X(x)+'" cy="'+Y(fn(x))+'" r="5" fill="'+color+'"/>';
 const m=d.graphs[id];
 return '<section class="lesson-section graph-panel" data-retrofit-graph="true"><h3>Graph '+id+'</h3><p><b>f(x)='+esc(m.f)+'</b> (blue); <b>g(x)='+esc(m.g)+'</b> (orange).</p><svg viewBox="0 0 700 380" role="img" aria-label="Graph '+id+'" style="width:100%;max-width:760px;background:#fff;border:1px solid #dbe4ee;border-radius:12px">'+grid+'<line x1="'+X(0)+'" x2="'+X(0)+'" y1="20" y2="343" stroke="#475569" stroke-width="2"/><line x1="48" x2="668" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="#475569" stroke-width="2"/>'+curve(q.f,q.F,'#1261a0')+curve(q.g,q.G,'#c76a16')+ends+'</svg><p>'+esc(m.domains)+'</p></section>';
}
module.exports=()=>['A','B','C','D'].map(graph).join('');
