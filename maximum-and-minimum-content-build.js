const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist','advanced-math','quadratic-functions','maximum-and-minimum');
fs.mkdirSync(base,{recursive:true});
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const shell=(t,b)=>'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+esc(t)+' | SUMMIT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Quadratic Functions</div><div class="page-type">'+esc(t)+'</div><div class="lesson-title">Maximum and Minimum</div><article class="lesson-content">'+b+'</article></section></main></body></html>';
const explanation='<section><h2>LESSON OBJECTIVE</h2><p>Find the vertex of a quadratic and use it to identify a maximum or minimum value.</p><h2>WHAT YOU NEED TO KNOW / CORE IDEA</h2><p>For y=ax²+bx+c, the x-coordinate of the vertex is h=-b/(2a). Then k=f(h). The vertex is (h,k).</p><h2>KEY DEFINITIONS</h2><p><b>Vertex:</b> the turning point. <b>Maximum:</b> greatest output. <b>Minimum:</b> least output.</p><h2>CORE RULE</h2><p>If a>0, the parabola opens upward and k is a minimum. If a<0, it opens downward and k is a maximum.</p><h2>HOW IT WORKS</h2><ol><li>Read a and b.</li><li>Compute h=-b/(2a).</li><li>Substitute h into the function to find k.</li><li>State the vertex and extremum.</li></ol><h2>WORKED EXAMPLES</h2><ol><li>y=x²-6x+5: h=3, k=9-18+5=-4, so vertex (3,-4), minimum -4.</li><li>y=-2x²+8x+1: h=2, k=-8+16+1=9, so vertex (2,9), maximum 9.</li><li>h(t)=-5t²+30t+2: t=3, h(3)=47, so the maximum height is 47.</li></ol><h2>COMMON MISTAKES</h2><ul><li>Dropping the negative sign in -b/(2a).</li><li>Reporting h but forgetting to evaluate k.</li><li>Calling a minimum when a<0, or a maximum when a>0.</li></ul><h2>EXAM STRATEGY</h2><p>Use h=-b/(2a) first; then evaluate only once. In context, include units and interpret the turning point.</p><h2>QUICK CHECK</h2><p>For y=2(x-4)²-7, the minimum is -7 at x=4.</p><h2>LESSON RECAP</h2><p>Vertex (h,k), h=-b/(2a), k=f(h); sign of a determines max/min.</p><h2>NEXT STEP</h2><p><a href="../problems/">Practice Problems</a> · <a href="../answers/">Answers & Solutions</a> · <a href="../test/">Lesson Test</a></p></section>';
const qs=[
['Find the vertex of y=x²-8x+7.','(4,-9)','h=8/2=4; f(4)=16-32+7=-9.'],
['Find the vertex of y=-x²+6x-2.','(3,7)','h=-6/(-2)=3; f(3)=-9+18-2=7.'],
['Find the minimum of y=2x²-12x+5.','-13','h=12/4=3; f(3)=18-36+5=-13.'],
['Find the maximum of y=-3x²+18x-4.','23','h=-18/(-6)=3; f(3)=-27+54-4=23.'],
['At what x does y=4x²+16x+1 reach its minimum?','x=-2','h=-16/8=-2; a>0 so it is a minimum.'],
['At what x does y=-5x²-20x+7 reach its maximum?','x=-2','h=20/(-10)=-2; a<0 so it is a maximum.'],
['Find the vertex of y=3x²+12x+8.','(-2,-4)','h=-12/6=-2; f(-2)=12-24+8=-4.'],
['Find the vertex of y=-2x²-8x+3.','(-2,11)','h=8/(-4)=-2; f(-2)=-8+16+3=11.'],
['A projectile h(t)=-5t²+30t+2: maximum height?','47','t=30/10=3; h(3)=-45+90+2=47.'],
['Profit P(x)=-2x²+24x-40: maximizing x and profit?','x=6; 32','x=24/4=6; P(6)=-72+144-40=32.'],
['For f(x)=2x²+bx+9, vertex x=4: find b.','b=-16','4=-b/4, so b=-16.'],
['For y=ax²+12x+7, vertex x=-3: find a.','a=2','-3=-12/(2a) gives 6a=12, so a=2.'],
['Vertex (2,-5), leading coefficient 3: find equation.','y=3x²-12x+7','y=3(x-2)²-5=3x²-12x+7.'],
['Vertex of y=x²+kx+10 at x=5: find k and vertex.','k=-10; (5,-15)','5=-k/2 gives k=-10; f(5)=25-50+10=-15.'],
['Ball h(t)=-4t²+24t+1: time and max height?','t=3; 37','t=24/8=3; h(3)=-36+72+1=37.'],
['y=(m+1)x²-6mx+4 has vertex x=1: find m.','m=1/2','1=6m/[2(m+1)] gives 2m+2=6m, so m=1/2.'],
['R(x)=-x²+18x-20: max revenue?','61','x=18/2=9; R(9)=-81+162-20=61.'],
['Identify extremum of y=2(x-4)²-7.','minimum -7 at x=4','Vertex form shows minimum -7 at x=4.']
];
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
const problems=groups.map(g=>'<section><h2>'+g[0]+'</h2>'+qs.slice(g[1],g[2]).map((q,i)=>'<div class="question"><b>'+(g[1]+i+1)+'. '+esc(q[0])+'</b></div>').join('')+'</section>').join('');
const answers=groups.map(g=>'<section><h2>'+g[0]+'</h2>'+qs.slice(g[1],g[2]).map((q,i)=>'<div class="solution"><h3>'+(g[1]+i+1)+'. '+esc(q[0])+'</h3><p>'+esc(q[2])+'</p><p><strong>Answer: '+esc(q[1])+'</strong></p></div>').join('')+'</section>').join('');
const tests=[['Easy','Find the minimum of y=x²-10x+31.','6'],['Easy / Medium','Find the maximum of y=-2x²+4x+7.','9'],['Medium','Find the vertex of y=3x²+18x+31.','(-3,4)'],['Medium / Hard','For y=2x²+bx+5 with vertex x=-3, find b and vertex.','b=12; (-3,-13)'],['Hard / Exam-Style','h(t)=-4t²+24t+1: time and max height?','t=3; 37']];
const test='<p>Answer all five questions, then submit.</p>'+tests.map((q,i)=>'<section><h3>'+(i+1)+'. '+q[0]+'</h3><p>'+esc(q[1])+'</p><label>Answer <input></label></section>').join('')+'<button id="submitTest">Submit Test</button><div id="result"></div>';
const video=(ar)=>'<section><h2>'+ (ar?'القيمة العظمى والصغرى':'Maximum and Minimum') +'</h2><p>'+ (ar?'احسب h=-b/(2a) ثم k=f(h). إذا كان a موجبًا فهي قيمة صغرى، وإذا كان سالبًا فهي قيمة عظمى.':'Compute h=-b/(2a), then k=f(h). Positive a means minimum; negative a means maximum.') +'</p></section>';
if(qs.length!==18||tests.length!==5||groups.map(g=>g[2]-g[1]).join('/')!=='3/8/5/2')throw new Error('QA failed');
for(const x of [['explanation','Explanation',explanation],['problems','Practice Problems',problems],['answers','Answers & Solutions',answers],['test','Lesson Test',test]]){const d=path.join(base,x[0]);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),shell(x[1],x[2]));}
for(const l of ['english','arabic']){const d=path.join(base,'video',l);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),shell('Lesson Video',video(l==='arabic')));}
console.log('Maximum and Minimum complete');