const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'dist','lessons','advanced-math','quadratic-equations','one-real-solution');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const shell=(title,body)=>`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | SUMMIT</title><link rel="stylesheet" href="/styles.css"></head><body><main class="lesson-page"><p class="eyebrow">Advanced Math · Quadratic Equations</p><h1>${title}</h1>${body}</main></body></html>`;
const problems=[
['Skill Check','How many real solutions does x²−6x+9=0 have?'],['Skill Check','For x²+4x+k=0, what value of k gives exactly one real solution?'],['Skill Check','Does 4x²+12x+9=0 have one real solution? Give the repeated root.'],
['Core Practice','Find k so x²−10x+k=0 has exactly one real solution.'],['Core Practice','Find m so 2x²+mx+8=0 has exactly one real solution.'],['Core Practice','Find the repeated root of 9x²−12x+4=0.'],['Core Practice','For 3x²−6x+c=0, find c for exactly one real solution.'],['Core Practice','Find p so x²+px+16=0 has exactly one real solution. Give all possible p.'],['Core Practice','The graph y=x²−8x+q touches the x-axis once. Find q and the touching point.'],['Core Practice','For ax²+6x+1=0 with a≠0, find a so there is exactly one real solution.'],['Core Practice','A quadratic has a=5 and c=20. Find all b values that make one real solution.'],
['Exam-Style','The equation 2x²+(k−1)x+8=0 has exactly one real solution. Find k.'],['Exam-Style','The line y=4x−7 is tangent to y=x²+x+k. Find k.'],['Exam-Style','For x²−2tx+(t²+6t)=0, find all t for which the equation has exactly one real solution.'],['Exam-Style','The equation (r+1)x²−4x+1=0 has exactly one real solution and is quadratic. Find r.'],['Exam-Style','A parabola y=3x²+bx+12 touches the x-axis at x=−2. Find b and verify the one-solution condition.'],
['Challenge','For x²+(m+2)x+(m−1)=0, find all m that give exactly one real solution.'],['Challenge','For (k−2)x²+2(k+1)x+(k−2)=0, find all k for which the equation is quadratic and has exactly one real solution.']
];
const answers=[
'One. Δ=(−6)²−4(1)(9)=0; the repeated root is x=3.','k=4. Set Δ=4²−4(1)k=0.','Yes. Δ=12²−4(4)(9)=0, and x=−12/(8)=−3/2.',
'k=25. Δ=100−4k=0.','m=±8. Δ=m²−64=0.','x=2/3. Since (3x−2)²=0.','c=3. Δ=36−12c=0.','p=±8. Δ=p²−64=0.','q=16; touching point (4,0). Δ=64−4q=0 and x=8/2=4.','a=9. Δ=36−4a=0.','b=±20. Δ=b²−400=0.',
'k=9 or k=−7. (k−1)²−64=0, so k−1=±8.','k=−3/4. Substitute: x²−3x+(k+7)=0. Tangency requires 9−4(k+7)=0.','t=0. Δ=(−2t)²−4(t²+6t)=−24t, so Δ=0 gives t=0.','r=3. Δ=16−4(r+1)=0, and r+1=4≠0.','b=12. The vertex/root condition gives −b/(6)=−2, so b=12; Δ=144−144=0.',
'm=−4±2√2. Δ=(m+2)²−4(m−1)=m²+8; wait—this simplifies to m²+8, so there are no real m. Therefore no real value of m gives exactly one real solution.','k=1/2. Δ=4(k+1)²−4(k−2)²=12(2k−1); set to 0 gives k=1/2, and k−2≠0.'
];
// Mathematical QA: repair Challenge 1 statement/solution to a solvable discriminant-zero parameter task.
problems[16][1]='For x²+(m+2)x+(m−1)²=0, find all real m that give exactly one real solution.';
answers[16]='m=0 or m=4/3. Set Δ=(m+2)²−4(m−1)²=0. Factoring gives (−m+4)(3m)=0.';
const tests=[
['Easy','How many real solutions does x²+2x+1=0 have?','One; Δ=0.'],['Medium','Find k so x²+6x+k=0 has exactly one real solution.','k=9.'],['Medium-Hard','Find b so 2x²+bx+18=0 has one real solution.','b=±12.'],['Hard','The line y=2x+5 is tangent to y=x²+k. Find k.','k=4. Substitute to get x²−2x+(k−5)=0; Δ=24−4k=0, so k=6.'],['Exam-Style','For (a−1)x²+6x+a=0, find all a for which the equation is quadratic and has exactly one real solution.','Δ=36−4a(a−1)=0 → a²−a−9=0 → a=(1±√37)/2; both are ≠1.']
];
// QA correction for Test 4 answer.
tests[3][2]='k=6. Substitute: x²−2x+(k−5)=0; Δ=4−4(k−5)=24−4k=0.';
const explanation=`<section class="lesson-card"><h2>Big idea</h2><p>A quadratic equation ax²+bx+c=0 (a≠0) has exactly one real solution when its two roots merge into one repeated root. The fastest SAT test is the discriminant.</p><div class="formula">Δ=b²−4ac</div><p><strong>Exactly one real solution ⇔ Δ=0.</strong></p></section><section class="lesson-card"><h2>Why Δ=0 works</h2><p>The quadratic formula is x=(−b±√Δ)/(2a). When Δ=0, the square-root term disappears, so the + and − branches give the same number: x=−b/(2a). On a graph, the parabola touches the x-axis at exactly one point instead of crossing it.</p></section><section class="lesson-card"><h2>SAT workflow</h2><ol><li>Put the equation in standard form ax²+bx+c=0.</li><li>Identify a, b, and c carefully, including signs.</li><li>Set b²−4ac=0.</li><li>Solve for the requested parameter.</li><li>Check that a≠0 so the equation is still quadratic.</li></ol></section><section class="lesson-card"><h2>Example</h2><p>For 2x²+kx+8=0 to have one real solution, k²−4(2)(8)=0, so k²=64 and k=±8. The repeated root is x=−k/4.</p></section><section class="lesson-card"><h2>Common traps</h2><ul><li>Using Δ&gt;0; that means two distinct real solutions.</li><li>Forgetting both signs when solving k²=A.</li><li>Not moving every term to one side before reading a, b, c.</li><li>Accepting a parameter value that makes a=0 and destroys the quadratic.</li></ul></section>`;
const grouped=['Skill Check','Core Practice','Exam-Style','Challenge'].map(g=>`<section class="lesson-card"><h2>${g}</h2>${problems.map((p,i)=>p[0]===g?`<article><h3>${i+1}</h3><p>${esc(p[1])}</p></article>`:'').join('')}</section>`).join('');
const ans=answers.map((a,i)=>`<article class="lesson-card"><h2>${i+1}</h2><p>${esc(a)}</p></article>`).join('');
const test=tests.map((q,i)=>`<article class="lesson-card"><p class="eyebrow">${q[0]}</p><h2>Question ${i+1}</h2><p>${esc(q[1])}</p><details><summary>Answer</summary><p>${esc(q[2])}</p></details></article>`).join('');
fs.mkdirSync(ROOT,{recursive:true});
fs.writeFileSync(path.join(ROOT,'index.html'),shell('One Real Solution',explanation));
fs.mkdirSync(path.join(ROOT,'problems'),{recursive:true}); fs.writeFileSync(path.join(ROOT,'problems','index.html'),shell('One Real Solution — Practice',grouped));
fs.mkdirSync(path.join(ROOT,'answers'),{recursive:true}); fs.writeFileSync(path.join(ROOT,'answers','index.html'),shell('One Real Solution — Answers',ans));
fs.mkdirSync(path.join(ROOT,'test'),{recursive:true}); fs.writeFileSync(path.join(ROOT,'test','index.html'),shell('One Real Solution — Test',test));
if(problems.length!==18||answers.length!==18||tests.length!==5) throw new Error('count QA failed');
const counts=problems.reduce((m,p)=>(m[p[0]]=(m[p[0]]||0)+1,m),{}); if(JSON.stringify(counts)!==JSON.stringify({'Skill Check':3,'Core Practice':8,'Exam-Style':5,'Challenge':2})) throw new Error('section QA failed');
console.log('One Real Solution content: 18 practice, 18 solutions, 5 test — QA passed');