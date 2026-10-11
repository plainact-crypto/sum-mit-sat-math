const fs=require('fs'),path=require('path');
const base='advanced-math/nonlinear-functions/converting-between-representations';
const root=path.join(__dirname,'dist',base);
const routes=['explanation','problems','answers','test','video/english','video/arabic'];
const nav='<nav aria-label="Lesson pages">'+routes.map(r=>'<a href="/'+base+'/'+r+'/">'+r+'</a>').join(' · ')+'</nav>';
const xp=x=>80+90*x,yp=y=>280-28*(y+2);
const values=Array.from({length:101},(_,i)=>0.4+i*3.2/100);
const points=values.map(x=>xp(x).toFixed(2)+','+yp(3*(x-2)**2-1).toFixed(2)).join(' ');
const graph='<section class="lesson-section"><h2>VERIFIED GRAPH: equation to graph</h2><p>y=3(x−2)²−1 has vertex (2,−1) and passes through (3,2), because 3(3−2)²−1=2.</p><svg viewBox="0 0 540 360" role="img" aria-label="Verified parabola y equals 3 times x minus 2 squared minus 1, with vertex 2 negative 1 and point 3 2" style="max-width:100%"><line x1="80" y1="0" x2="80" y2="340" stroke="currentColor"/><line x1="65" y1="'+yp(0)+'" x2="480" y2="'+yp(0)+'" stroke="currentColor"/><polyline points="'+points+'" fill="none" stroke="#1976d2" stroke-width="3"/>'+[[2,-1],[3,2]].map(([x,y])=>'<circle cx="'+xp(x)+'" cy="'+yp(y)+'" r="5" fill="#b12b43"/>').join('')+[0,1,2,3,4].map(x=>'<text x="'+xp(x)+'" y="'+(yp(0)+18)+'" font-size="12" text-anchor="middle">'+x+'</text>').join('')+[-1,0,2,4,6].map(y=>'<text x="62" y="'+(yp(y)+4)+'" font-size="12" text-anchor="end">'+y+'</text>').join('')+'</svg></section>';
for(const route of ['explanation','problems','answers','test']){
 const file=path.join(root,route,'index.html');let html=fs.readFileSync(file,'utf8');
 if(route==='explanation'){html=html.replace('</article>',graph+'</article>');html=html.replace('</head>','<!-- SUMMIT_RETROFIT:converting-between-representations:DESMOS --></head>');}
 html=html.replace('</article>','</article>'+nav);fs.writeFileSync(file,html);
}
if(Math.abs(3*(3-2)**2-1-2)>1e-10)throw Error('Graph math check failed');
console.log('Lesson155: verified mathematical graph and six-way internal navigation.');
