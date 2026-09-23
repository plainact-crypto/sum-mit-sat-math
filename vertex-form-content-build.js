const fs=require('fs'),path=require('path');
const dist=path.join(__dirname,'dist'),base=path.join(dist,'advanced-math','quadratic-equations','vertex-form');fs.mkdirSync(base,{recursive:true});
const shell=(title,body)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Vertex Form — ${title} | SUMMIT SAT MATH</title></head><body><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Quadratic Equations</div><div class="page-type">${title}</div><div class="lesson-title">Vertex Form</div><article class="lesson-content">${body}</article></section></main></body></html>`;
const sec=(k,h,b)=>`<section class="lesson-section"><span class="section-kicker">${k}</span><h2>${h}</h2>${b}</section>`;
const exp=[
sec('01 · LESSON OBJECTIVE','Read, write, and use vertex form.',`<p>Interpret <strong>y=a(x-h)^2+k</strong>, identify the vertex and axis of symmetry, determine opening and extrema, and convert simple standard-form quadratics by completing the square.</p><div class="equation-callout"><strong>y=a(x-h)^2+k → vertex (h,k)</strong></div>`),
sec('02 · CORE IDEA','Vertex form makes the turning point visible.',`<p>A parabola is symmetric around its vertex. In <strong>y=a(x-h)^2+k</strong>, the squared term is smallest at x=h because (x-h)^2=0. Therefore y=k there.</p>`),
sec('03 · KEY DEFINITIONS','Know the language.',`<div class="definition-grid"><div><h3>Vertex</h3><p>The turning point (h,k).</p></div><div><h3>Axis of symmetry</h3><p>The vertical line x=h.</p></div><div><h3>Minimum / Maximum</h3><p>k is the minimum if a&gt;0 and maximum if a&lt;0.</p></div></div>`),
sec('04 · CORE RULE','Read h with the opposite inside sign.',`<p><strong>(x-3)^2 → h=3</strong>, while <strong>(x+4)^2=(x-(-4))^2 → h=-4</strong>. If a&gt;0 the parabola opens up; if a&lt;0 it opens down. Larger |a| gives a narrower vertical stretch; 0&lt;|a|&lt;1 gives a wider vertical compression.</p>`),
sec('05 · HOW IT WORKS','Use a four-step scan.',`<ol><li>Match the equation to y=a(x-h)^2+k.</li><li>Read vertex (h,k) and axis x=h.</li><li>Use the sign of a for opening and whether k is a minimum or maximum.</li><li>If needed, substitute a point or complete the square.</li></ol>`),
sec('06 · WORKED EXAMPLE 1','Read a vertex directly.',`<p>For y=2(x-5)^2+1: h=5 and k=1, so the vertex is <strong>(5,1)</strong> and axis is <strong>x=5</strong>. Since a=2&gt;0, it opens up and the minimum value is <strong>1</strong>.</p>`),
sec('07 · WORKED EXAMPLE 2','Handle the inside sign carefully.',`<p>For y=-(x+3)^2+8, rewrite x+3 as x-(-3). Thus the vertex is <strong>(-3,8)</strong>, axis x=-3, and because a=-1 the parabola opens down with maximum <strong>8</strong>.</p>`),
sec('08 · WORKED EXAMPLE 3','Write an equation from a vertex.',`<p>Vertex (2,-4), a=3: substitute h=2, k=-4 into y=a(x-h)^2+k.</p><div class="solution-stack"><code>y=3(x-2)^2-4</code></div>`),
sec('09 · WORKED EXAMPLE 4','Find a from a point.',`<p>A parabola has vertex (2,-3) and passes through (4,5).</p><div class="solution-stack"><code>y=a(x-2)^2-3</code><code>5=a(4-2)^2-3</code><code>8=4a</code><code>a=2</code></div><p>So <strong>y=2(x-2)^2-3</strong>.</p>`),
sec('10 · WORKED EXAMPLE 5','Convert by completing the square.',`<div class="solution-stack"><code>y=x^2-6x+11</code><code>y=(x^2-6x+9)+2</code><code>y=(x-3)^2+2</code></div><p>The vertex is <strong>(3,2)</strong>.</p>`),
sec('11 · DESMOS STRATEGY','Use the graph to verify, not replace, the algebra.',`<div class="rule-grid"><div><small>Enter</small><strong>y=-2(x-3)^2+5</strong></div><div><small>Look for</small><strong>Turning point (3,5)</strong></div><div><small>Use it to answer</small><span>Confirm the vertex, opening, and maximum/minimum.</span></div><div><small>Why it works</small><span>The graph displays the same quadratic relation.</span></div><div><small>Faster or not?</small><span>Reading vertex form directly is faster; graphing is useful as a check.</span></div></div>`),
sec('12 · COMMON MISTAKES','Avoid these traps.',`<ul><li>Copying the sign inside parentheses instead of reversing it for h.</li><li>Calling k the y-intercept; k is the y-value of the vertex.</li><li>Ignoring the sign of a when deciding maximum versus minimum.</li><li>Expanding vertex form when the requested information is already visible.</li></ul>`),
sec('13 · EXAM STRATEGY','Read before you calculate.',`<p>If the question asks where a maximum/minimum occurs, use <strong>x=h</strong>. If it asks for the maximum/minimum value, use <strong>k</strong>. Expand only when another form is specifically needed.</p>`),
sec('14 · QUICK CHECK','Try these mentally.',`<p>1) Vertex of y=(x-6)^2+2? &nbsp; 2) Maximum of y=-3(x+1)^2+9? &nbsp; 3) Axis of y=4(x+5)^2-7?</p><details><summary>Show answers</summary><p>1) (6,2) &nbsp; 2) 9 &nbsp; 3) x=-5</p></details>`),
sec('15 · LESSON RECAP','Keep the structure in view.',`<p><strong>y=a(x-h)^2+k</strong>: vertex (h,k), axis x=h; a&gt;0 opens up, a&lt;0 opens down; k is the extremum value.</p>`),
sec('16 · NEXT STEP','Continue the lesson.',`<div class="next-links"><a href="../problems/">Practice Problems</a><a href="../answers/">Answers &amp; Solutions</a><a href="../test/">Lesson Test</a><a href="../video/english/">Full Lesson Video</a></div>`)
].join('');
const qs=[
['Skill Check','Find the vertex of y=(x-4)^2+7.','(4,7)','Here h=4 and k=7, so the vertex is (4,7).'],
['Skill Check','Find the vertex of y=(x+2)^2-5.','(-2,-5)','x+2=x-(-2), so h=-2 and k=-5.'],
['Skill Check','Does y=-3(x-1)^2+6 open up or down?','Down','a=-3 is negative, so the parabola opens downward.'],
['Core Practice','State the axis of symmetry of y=2(x-5)^2+1.','x=5','The axis of symmetry is x=h; here h=5.'],
['Core Practice','Find the minimum value of y=(x+3)^2-8.','-8','a=1>0, so the vertex is a minimum; k=-8.'],
['Core Practice','Find the maximum value of y=-4(x-2)^2+9.','9','a=-4<0, so the vertex is a maximum; k=9.'],
['Core Practice','Write vertex form with vertex (3,-2) and a=1.','y=(x-3)^2-2','Use y=a(x-h)^2+k with h=3, k=-2, a=1.'],
['Core Practice','Write vertex form with vertex (-4,5) and a=2.','y=2(x+4)^2+5','With h=-4, x-h=x+4; substitute a=2 and k=5.'],
['Core Practice','Convert y=x^2-6x+11 to vertex form.','y=(x-3)^2+2','Complete the square: x²-6x+11=(x²-6x+9)+2=(x-3)²+2.'],
['Core Practice','Convert y=x^2+8x+13 to vertex form.','y=(x+4)^2-3','Complete the square: x²+8x+13=(x²+8x+16)-3=(x+4)²-3.'],
['Core Practice','For y=-2(x+1)^2+4, give vertex and axis.','Vertex (-1,4); axis x=-1','x+1=x-(-1), so h=-1 and k=4; the symmetry line is x=-1.'],
['Exam-Style','A projectile height is h=-5(t-2)^2+25. What is its maximum height?','25','The coefficient is negative, so the vertex is a maximum. Its height coordinate is k=25.'],
['Exam-Style','A parabola has minimum 3 at x=-2 and a=4. Write its equation.','y=4(x+2)^2+3','Minimum 3 at x=-2 gives vertex (-2,3). Substitute h=-2, k=3, a=4.'],
['Exam-Style','Which x-value minimizes f(x)=3(x-7)^2-1?','7','a=3>0, so the minimum occurs at the vertex, where x=h=7.'],
['Exam-Style','If g(x)=-(x+5)^2+12, find g(-5).','12','Substitute x=-5: g(-5)=-(0)^2+12=12.'],
['Exam-Style','Convert y=2x^2-8x+11 to vertex form.','y=2(x-2)^2+3','Factor 2 from the quadratic terms: 2(x²-4x)+11=2[(x-2)²-4]+11=2(x-2)²+3.'],
['Challenge','A parabola has vertex (2,-3) and passes through (4,5). Find a.','2','Use 5=a(4-2)²-3. Then 8=4a, so a=2.'],
['Challenge','A parabola has vertex (-1,4) and passes through (1,-4). Write its equation.','y=-2(x+1)^2+4','Start y=a(x+1)²+4. Use (1,-4): -4=4a+4, so a=-2.']
];
const groups=[['SKILL CHECK',0,3],['CORE PRACTICE',3,11],['EXAM-STYLE PRACTICE',11,16],['CHALLENGE PROBLEMS',16,18]];
const problems=groups.map(([g,a,b])=>`<section class="lesson-section"><h2>${g}</h2>${qs.slice(a,b).map((q,j)=>`<div class="practice-item"><h3>${a+j+1}</h3><p>${q[1]}</p></div>`).join('')}</section>`).join('');
const answers=groups.map(([g,a,b])=>`<section class="lesson-section"><h2>${g}</h2>${qs.slice(a,b).map((q,j)=>`<div class="solution-item"><h3>Solution ${a+j+1}</h3><p><strong>${q[2]}</strong></p><p>${q[3]}</p></div>`).join('')}</section>`).join('');
const tests=[
['Easy','Find the vertex of y=(x-6)^2+2.','(6,2)'],
['Easy / Medium','Find the maximum value of y=-2(x+3)^2+10.','10'],
['Medium','Write vertex form for a parabola with vertex (1,-4) and a=3.','y=3(x-1)^2-4'],
['Medium / Hard','Convert y=x^2+10x+21 to vertex form.','y=(x+5)^2-4'],
['Hard / Exam-Style','A parabola has vertex (2,5) and passes through (0,-3). Find its equation.','y=-2(x-2)^2+5']
];
const test=`<form id="lessonTest">${tests.map((q,i)=>`<section class="lesson-section"><h3>${i+1} · ${q[0]}</h3><p>${q[1]}</p><input name="q${i+1}" aria-label="Answer ${i+1}"></section>`).join('')}<button type="button" id="submitTest">Submit Test</button><section id="testReview" hidden><h2>Answer Review</h2>${tests.map((q,i)=>`<p><strong>${i+1}.</strong> ${q[2]}</p>`).join('')}</section></form><script>document.getElementById('submitTest').addEventListener('click',()=>{document.getElementById('testReview').hidden=false;});</script>`;
for(const [name,title,body] of [['explanation','Explanation',exp],['problems','Practice Problems',problems],['answers','Answers & Solutions',answers],['test','Lesson Test',test]]){const d=path.join(base,name);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),shell(title,body));}
console.log('Vertex Form canonical package built: 18 practice (3/8/5/2), 18 aligned worked solutions, 5 progressive test questions.');