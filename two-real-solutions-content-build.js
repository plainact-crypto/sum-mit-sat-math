const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'dist','lessons','advanced-math','quadratic-equations','two-real-solutions');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const shell=(title,body)=>`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | SUMMIT</title><link rel="stylesheet" href="/styles.css"></head><body><main class="lesson-page"><p class="eyebrow">Advanced Math · Quadratic Equations</p><h1>${title}</h1>${body}</main></body></html>`;
const problems=[
['Skill Check','How many distinct real solutions does x²−5x+6=0 have?'],
['Skill Check','Does 2x²+3x−2=0 have two distinct real solutions? Justify using the discriminant.'],
['Skill Check','For x²+4x+k=0, what condition on k gives two distinct real solutions?'],
['Core Practice','Determine whether x²−8x+12=0 has two distinct real solutions, then find them.'],
['Core Practice','Find all k such that x²−6x+k=0 has two distinct real solutions.'],
['Core Practice','For 3x²+bx+3=0, find the condition on b for two distinct real solutions.'],
['Core Practice','Find all m such that 2x²+mx+8=0 has two distinct real solutions.'],
['Core Practice','The graph y=x²−10x+c crosses the x-axis twice. Find the condition on c.'],
['Core Practice','For ax²+4x+1=0 with a≠0, find the condition on a for two distinct real solutions.'],
['Core Practice','Find the two solutions of 2x²−7x+3=0.'],
['Core Practice','A quadratic has roots 2 and 5. Write a monic quadratic equation and verify that its discriminant is positive.'],
['Exam-Style','The equation x²+(k−2)x+k=0 has two distinct real solutions. Find the set of possible k values.'],
['Exam-Style','The line y=3x+1 intersects y=x²−x+k at two distinct points. Find the condition on k.'],
['Exam-Style','For 2x²−2tx+(t+3)=0, find all t for which there are two distinct real solutions.'],
['Exam-Style','The equation (p−1)x²+6x+2=0 is quadratic and has two distinct real solutions. Find the allowable values of p.'],
['Exam-Style','A parabola y=x²+bx+9 crosses the x-axis at two distinct points. Find the condition on b.'],
['Challenge','For x²+(m+1)x+m²=0, find all real m for which there are two distinct real solutions.'],
['Challenge','For (k−2)x²+2(k+1)x+(k−2)=0, find all real k for which the equation is quadratic and has two distinct real solutions.']
];
const answers=[
'Two. Δ=(−5)²−4(1)(6)=1>0, so there are two distinct real roots.','Yes. Δ=3²−4(2)(−2)=25>0.','k<4. Δ=16−4k>0 gives k<4.',
'Yes. Δ=64−48=16>0; x=(8±4)/2, so x=2 or 6.','k<9. Δ=36−4k>0.','|b|>6, equivalently b<−6 or b>6, because Δ=b²−36>0.','m<−8 or m>8. Δ=m²−64>0.','c<25. Δ=100−4c>0.','a<4 with a≠0. Δ=16−4a>0 gives a<4, while a≠0 keeps the equation quadratic.','x=1/2 or x=3. Factor: (2x−1)(x−3)=0.','x²−7x+10=0. Its discriminant is 49−40=9>0.',
'k<6−4√2 or k>6+4√2. Here Δ=(k−2)²−4k=k²−8k+4; solve Δ>0 using its zeros 4±2√3. Correction: the zeros are 4±2√3, so k<4−2√3 or k>4+2√3.','k<5. Set the graphs equal: x²−4x+(k−1)=0. Two intersections require Δ=16−4(k−1)=20−4k>0.','t<1−√7 or t>1+√7. Δ=4t²−8(t+3)=4(t²−2t−6)>0; zeros are 1±√7.','p<11/2 with p≠1. Δ=36−8(p−1)=44−8p>0, and p−1≠0.','b<−6 or b>6 because Δ=b²−36>0.',
'(−1−√3)/2 < m < (−1+√3)/2. Δ=(m+1)²−4m²=−3m²+2m+1; correction: zeros are m=−1/3 and m=1, so −1/3<m<1.','k>1/2 with k≠2. Δ=4(k+1)²−4(k−2)²=12(2k−1)>0; k≠2 keeps the equation quadratic.'
];
// Final QA-normalized solutions for parameter inequalities.
answers[11]='k<4−2√3 or k>4+2√3. Δ=(k−2)²−4k=k²−8k+4. Its zeros are 4±2√3, and the upward-opening expression is positive outside them.';
answers[16]='−1/3<m<1. Δ=(m+1)²−4m²=−3m²+2m+1. The zeros are −1/3 and 1; this downward-opening expression is positive between them.';
const tests=[
['Easy','How many distinct real solutions does x²−3x+2=0 have?','Two; Δ=9−8=1>0.'],
['Medium','Find the condition on k so x²+2x+k=0 has two distinct real solutions.','k<1, because Δ=4−4k>0.'],
['Medium-Hard','For 2x²+bx+8=0, find all b that give two distinct real solutions.','b<−8 or b>8, since Δ=b²−64>0.'],
['Hard','The line y=2x+5 intersects y=x²+k twice. Find the condition on k.','k<6. Substitution gives x²−2x+(k−5)=0; Δ=24−4k>0.'],
['Exam-Style','For (a−1)x²+4x+a=0, find all a for which the equation is quadratic and has two distinct real solutions.','Δ=16−4a(a−1)>0 gives a²−a−4<0. Thus (1−√17)/2<a<(1+√17)/2, with a≠1.']
];
const explanation=`<section class="lesson-card"><h2>Big idea</h2><p>A quadratic equation ax²+bx+c=0 (a≠0) has <strong>two distinct real solutions</strong> exactly when its discriminant is positive.</p><div class="formula">Δ=b²−4ac</div><p><strong>Two distinct real solutions ⇔ Δ&gt;0.</strong></p></section><section class="lesson-card"><h2>Why a positive discriminant gives two roots</h2><p>In x=(−b±√Δ)/(2a), a positive Δ makes √Δ a positive real number. The plus and minus branches therefore produce two different real values. Graphically, the parabola crosses the x-axis at two distinct points.</p></section><section class="lesson-card"><h2>SAT workflow</h2><ol><li>Rewrite the equation in standard form ax²+bx+c=0.</li><li>Identify a, b, and c with their signs.</li><li>Compute Δ=b²−4ac.</li><li>For a parameter question, solve the strict inequality Δ&gt;0.</li><li>Exclude any parameter value that makes a=0 when the prompt requires a quadratic.</li></ol></section><section class="lesson-card"><h2>Worked example</h2><p>For x²+kx+9=0 to have two distinct real roots, k²−36&gt;0. Therefore |k|&gt;6, so k&lt;−6 or k&gt;6.</p></section><section class="lesson-card"><h2>Graph connection</h2><p>Two real solutions mean two x-intercepts. If the quadratic represents the difference between a parabola and a line, Δ&gt;0 means the two graphs intersect twice.</p></section><section class="lesson-card"><h2>Common traps</h2><ul><li>Using Δ≥0. Equality gives one repeated real root, not two distinct roots.</li><li>Forgetting that a squared parameter inequality often has two outside intervals.</li><li>Reading a, b, c before moving all terms to one side.</li><li>Keeping a parameter value that makes the x² coefficient zero.</li></ul></section>`;
const grouped=['Skill Check','Core Practice','Exam-Style','Challenge'].map(g=>`<section class="lesson-card"><h2>${g}</h2>${problems.map((p,i)=>p[0]===g?`<article><h3>${i+1}</h3><p>${esc(p[1])}</p></article>`:'').join('')}</section>`).join('');
const ans=answers.map((a,i)=>`<article class="lesson-card"><h2>${i+1}</h2><p>${esc(a)}</p></article>`).join('');
const test=tests.map((q,i)=>`<article class="lesson-card"><p class="eyebrow">${q[0]}</p><h2>Question ${i+1}</h2><p>${esc(q[1])}</p><details><summary>Answer</summary><p>${esc(q[2])}</p></details></article>`).join('');
fs.mkdirSync(ROOT,{recursive:true});
fs.writeFileSync(path.join(ROOT,'index.html'),shell('Two Real Solutions',explanation));
fs.mkdirSync(path.join(ROOT,'problems'),{recursive:true});fs.writeFileSync(path.join(ROOT,'problems','index.html'),shell('Two Real Solutions — Practice',grouped));
fs.mkdirSync(path.join(ROOT,'answers'),{recursive:true});fs.writeFileSync(path.join(ROOT,'answers','index.html'),shell('Two Real Solutions — Answers',ans));
fs.mkdirSync(path.join(ROOT,'test'),{recursive:true});fs.writeFileSync(path.join(ROOT,'test','index.html'),shell('Two Real Solutions — Test',test));
if(problems.length!==18||answers.length!==18||tests.length!==5)throw new Error('count QA failed');
const counts=problems.reduce((m,p)=>(m[p[0]]=(m[p[0]]||0)+1,m),{});
for(const [k,v] of Object.entries({'Skill Check':3,'Core Practice':8,'Exam-Style':5,'Challenge':2}))if(counts[k]!==v)throw new Error(`${k} QA failed`);
console.log('Two Real Solutions content: 18 practice (3/8/5/2), 18 aligned solutions, 5 tests — QA passed');
