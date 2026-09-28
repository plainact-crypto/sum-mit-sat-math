const fs=require('fs'),path=require('path');
const base=path.join(__dirname,'dist','advanced-math','quadratic-functions','intercept-form','finding-the-vertex');fs.mkdirSync(base,{recursive:true});
const shell=(title,body)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Finding the Vertex — ${title} | SUMMIT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Quadratic Functions · Intercept Form</div><div class="page-type">${title}</div><div class="lesson-title">Finding the Vertex</div><article class="lesson-content">${body}</article></section></main></body></html>`;
const explanation=`<section><span class="section-kicker">01 · LESSON OBJECTIVE</span><h2>Find the vertex directly from intercept form.</h2><p>For <strong>y=a(x-r₁)(x-r₂)</strong>, the axis of symmetry is halfway between the roots: <strong>h=(r₁+r₂)/2</strong>. Then compute <strong>k=f(h)</strong>.</p></section>
<section><span class="section-kicker">02 · CORE IDEA</span><h2>The roots are symmetric around the vertex.</h2><p>The x-intercepts r₁ and r₂ are equally far from the vertical line through the vertex, so their midpoint is the vertex's x-coordinate.</p></section>
<section><span class="section-kicker">03 · KEY DEFINITIONS</span><p><strong>Intercept form:</strong> y=a(x-r₁)(x-r₂). <strong>Roots:</strong> r₁,r₂. <strong>Axis of symmetry:</strong> x=h. <strong>Vertex:</strong> (h,k).</p></section>
<section><span class="section-kicker">04 · CORE RULE</span><h2>h=(r₁+r₂)/2, then k=f(h)</h2><p>Read each root from its factor carefully: (x-5) gives root 5, while (x+3) gives root -3.</p></section>
<section><span class="section-kicker">05 · HOW IT WORKS</span><ol><li>Identify r₁ and r₂.</li><li>Average them to get h.</li><li>Substitute h into the original intercept-form equation.</li><li>Write the vertex (h,k); use the sign of a to identify a minimum or maximum.</li></ol></section>
<section><span class="section-kicker">06 · WORKED EXAMPLES</span><h3>Example 1</h3><p>y=(x-2)(x-8): h=(2+8)/2=5; k=(3)(-3)=-9. Vertex <strong>(5,-9)</strong>.</p><h3>Example 2</h3><p>y=-2(x+1)(x-5): roots -1 and 5, so h=2; k=-2(3)(-3)=18. Vertex <strong>(2,18)</strong>.</p><h3>Example 3</h3><p>y=3(x+4)(x-2): h=(-4+2)/2=-1; k=3(3)(-3)=-27. Vertex <strong>(-1,-27)</strong>.</p><h3>Example 4</h3><p>y=½(x-1)(x-7): h=4; k=½(3)(-3)=-9/2. Vertex <strong>(4,-9/2)</strong>.</p></section>
<section class="summit-desmos-strategy"><span class="section-kicker">07 · DESMOS STRATEGY</span><h2>Verify the turning point from the graph.</h2><p><strong>Enter:</strong> y=(x-2)(x-8)</p><p><strong>Look for:</strong> roots x=2 and x=8 and turning point (5,-9).</p><p><strong>Use it to answer:</strong> confirm that the vertex lies halfway between the two roots.</p><p><strong>Why it works:</strong> a parabola is symmetric about the vertical line through its vertex.</p><p><strong>Faster or not?</strong> Averaging the roots is faster when intercept form is already given; Desmos is useful as a check.</p><p><strong>Math cross-check:</strong> (2+8)/2=5 and f(5)=(3)(-3)=-9.</p></section>
<section><span class="section-kicker">08 · COMMON MISTAKES</span><ul><li>Reading x+3 as root +3 instead of -3.</li><li>Finding h but forgetting k.</li><li>Ignoring the leading coefficient a when evaluating k.</li><li>Averaging the factors instead of the roots.</li></ul></section>
<section><span class="section-kicker">09 · EXAM STRATEGY</span><p>If only the axis or x-coordinate of the vertex is asked, average the roots and stop. For the full vertex, substitute that midpoint into the original factored equation.</p></section>
<section><span class="section-kicker">10 · QUICK CHECK</span><p>1) y=(x-1)(x-9) → (5,-16). 2) y=-3(x+2)(x-4) → (1,27). 3) y=2(x+5)(x+1) → (-3,-8).</p></section>
<section><span class="section-kicker">11 · LESSON RECAP</span><p>Intercept form exposes the roots. Their midpoint gives <strong>h</strong>; evaluate the function there to get <strong>k</strong>. Vertex = <strong>(h,k)</strong>.</p></section>
<section><span class="section-kicker">12 · NEXT STEP</span><p><a href="../problems/">Practice Problems</a> · <a href="../answers/">Answers &amp; Solutions</a> · <a href="../test/">Lesson Test</a> · <a href="../video/english/">English Video</a> · <a href="../video/arabic/">Arabic Video</a></p></section>`;
const qs=[
['Find the vertex of y=(x-2)(x-8).','(5,-9)','Roots 2 and 8 give h=5; f(5)=3(-3)=-9.'],
['Find the vertex of y=(x+3)(x-5).','(1,-16)','Roots -3 and 5 give h=1; f(1)=4(-4)=-16.'],
['Find the vertex of y=-2(x-1)(x-7).','(4,18)','h=4; f(4)=-2(3)(-3)=18.'],
['Find the vertex of y=3(x+4)(x-2).','(-1,-27)','h=(-4+2)/2=-1; f(-1)=3(3)(-3)=-27.'],
['Find the vertex of y=2(x-6)(x+2).','(2,-32)','h=(6-2)/2=2; f(2)=2(-4)(4)=-32.'],
['Find the vertex of y=-(x+5)(x-1).','(-2,9)','h=(-5+1)/2=-2; f(-2)=-(3)(-3)=9.'],
['Find the vertex of y=4(x-3)(x-9).','(6,-36)','h=6; f(6)=4(3)(-3)=-36.'],
['Find the vertex of y=½(x-1)(x-7).','(4,-9/2)','h=4; f(4)=½(3)(-3)=-9/2.'],
['At what x-value does y=5(x+6)(x-2) reach its minimum?','x=-2','The roots are -6 and 2; their midpoint is -2.'],
['Find the maximum value of y=-3(x-4)(x-10).','27','h=7; f(7)=-3(3)(-3)=27.'],
['Find the minimum value of y=2(x+1)(x-5).','-18','h=2; f(2)=2(3)(-3)=-18.'],
['A parabola has equation y=(x-4)(x-12). Find its axis of symmetry and vertex.','x=8; vertex (8,-16)','Midpoint h=8; f(8)=4(-4)=-16.'],
['A projectile is modeled by h(t)=-2(t-1)(t-9). When is maximum height reached, and what is it?','t=5; maximum 32','The zeros are 1 and 9, so t=5; h(5)=-2(4)(-4)=32.'],
['For y=a(x-2)(x-10), the vertex has y-coordinate -24. Find a.','a=3/2','h=6 and f(6)=a(4)(-4)=-16a=-24, so a=3/2.'],
['The roots of a quadratic are -7 and 3, and a=2. Find the vertex.','(-2,-50)','h=(-7+3)/2=-2; f(-2)=2(5)(-5)=-50.'],
['A quadratic in intercept form has roots p and 12 and vertex x=5. Find p.','p=-2','(p+12)/2=5, so p=-2.'],
['For y=a(x-r₁)(x-r₂), r₁+r₂=14 and the vertex value is -45. If a=5, find |r₂-r₁|.','6','h=7. Let half-distance d; vertex value=5(d)(-d)=-5d²=-45, so d=3 and root distance=6.'],
['A parabola has roots -1 and 7 and passes through (0,-14). Find its vertex.','(3,32)','y=a(x+1)(x-7); -14=a(1)(-7) gives a=2. h=3; f(3)=2(4)(-4)=-32.']];
qs[17]=['A parabola has roots -1 and 7 and passes through (0,-14). Find its vertex.','(3,-32)','y=a(x+1)(x-7); -14=-7a gives a=2. h=3; f(3)=2(4)(-4)=-32.'];
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
const problems=groups.map(([g,s,e])=>`<section><h2>${g}</h2>${qs.slice(s,e).map((q,i)=>`<div class="question"><b>${s+i+1}. ${q[0]}</b></div>`).join('')}</section>`).join('');
const answers=groups.map(([g,s,e])=>`<section><h2>${g}</h2>${qs.slice(s,e).map((q,i)=>`<div class="solution"><h3>${s+i+1}. ${q[0]}</h3><p><strong>${q[1]}</strong></p><p>${q[2]}</p></div>`).join('')}</section>`).join('');
const tests=[
['Easy','Find the vertex of y=(x-3)(x-9).','(6,-9)','h=6; f(6)=3(-3)=-9.'],
['Easy / Medium','Find the vertex of y=-2(x+4)(x-2).','(-1,18)','h=-1; f(-1)=-2(3)(-3)=18.'],
['Medium','Find the minimum value of y=3(x-5)(x+1).','-27','h=2; f(2)=3(-3)(3)=-27.'],
['Medium / Hard','For y=a(x-2)(x-8), the vertex value is -18. Find a.','a=2','h=5; f(5)=a(3)(-3)=-9a=-18, so a=2.'],
['Hard / Exam-Style','A ball follows h(t)=-3(t-2)(t-10). Find when it reaches maximum height and that height.','t=6; maximum 48','The zeros are 2 and 10, so t=6; h(6)=-3(4)(-4)=48.']];
const test=`<p>Submit after answering all five questions.</p>${tests.map((q,i)=>`<section><h3>${i+1}. ${q[0]}</h3><p>${q[1]}</p><label>Answer <input></label></section>`).join('')}<button id="submitTest">Submit Test</button><div id="result"></div><script>document.getElementById('submitTest').onclick=()=>{document.getElementById('result').innerHTML='<h3>Answer Review</h3><ol>'+ ${JSON.stringify(tests.map(q=>'<li><strong>'+q[2]+'</strong> — '+q[3]+'</li>'))}.join('') +'</ol>';};</script>`;
if(qs.length!==18||groups.map(x=>x[2]-x[1]).join('/')!=='3/8/5/2'||tests.length!==5)throw new Error('Finding the Vertex structure QA failed');
for(const [name,title,body] of [['explanation','Explanation',explanation],['problems','Practice Problems',problems],['answers','Answers & Solutions',answers],['test','Lesson Test',test]]){const d=path.join(base,name);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),shell(title,body));}
console.log('Finding the Vertex complete: explanation + 18 practice + 18 aligned solutions + 5-test.');