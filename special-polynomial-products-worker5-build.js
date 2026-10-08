'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const dist=path.join(__dirname,'dist'),base='advanced-math/polynomial-operations/special-polynomial-products',dir=path.join(dist,base);
const title='Special Polynomial Products',url='https://scrimba.com/explain/guide02kg060qf?claim=j161b2fe5nsa9fbi&fullscreen=1';
const source=fs.readFileSync(path.join(__dirname,'special-polynomial-products-content-build.js'),'utf8');
const extract=source.slice(source.indexOf('const P='),source.indexOf('if(P.length'));
const ctx={};vm.runInNewContext(extract+';this.data={P,T};',ctx);const {P,T}=ctx.data;
if(P.length!==18||T.length!==5||[3,8,5,2].some((n,i)=>P.filter(q=>q[0]===['Skill Check','Core Practice','Exam-Style','Challenge'][i]).length!==n))throw Error('Lesson 65 invalid counts');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shell=(kind,body,js='')=>'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+title+' — '+kind+' | SUMMIT</title><style>.w5-q{margin:15px 0;padding:18px;border:1px solid #b5bfce;border-radius:12px}.w5-q input[type=text]{padding:9px}.w5-q button,#submit{padding:10px 15px;background:#14365d;color:white;border:0;border-radius:8px}.w5-answer{margin:12px 0;padding:15px;border-left:4px solid #3669a3}.w5-video{position:relative;aspect-ratio:16/9}.w5-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.lesson-section{margin:20px 0;padding:18px}</style></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Advanced Math · Polynomial Operations</div><div class="page-type">'+kind+'</div><div class="lesson-title">'+title+'</div><div class="subject-label">Advanced Math</div><article class="lesson-content">'+body+'</article><a class="back" href="/#subjects">← Back to curriculum tree</a></section></main>'+js+'</body></html>';
const sec=(n,h,p)=>'<section class="lesson-section"><span class="section-kicker">'+n+'</span><h2>'+h+'</h2>'+p+'</section>';
const explanation='<!-- EXPLANATION_CLASSIFICATION: NEITHER -->'+
sec('01 · LESSON OBJECTIVE','Recognize and expand special products','<p>Expand binomial squares and conjugates, reverse the patterns, and solve SAT-style applications.</p>')+
sec('02 · CORE IDEA','Cross-products explain the patterns','<p>Squaring a binomial creates two identical cross-products. Conjugates create opposite cross-products that cancel.</p>')+
sec('03 · KEY DEFINITIONS','Binomial, conjugates, perfect square','<p>A binomial has two terms. Conjugates are a+b and a−b. A perfect-square trinomial is the expansion of a squared binomial.</p>')+
sec('04 · CORE RULE','Three identities','<p><b>(a+b)²=a²+2ab+b²</b><br><b>(a−b)²=a²−2ab+b²</b><br><b>(a+b)(a−b)=a²−b²</b></p>')+
sec('05 · HOW IT WORKS','Identify the factors','<p>For matching binomials, square the ends and include twice the product. For plus-minus conjugates, subtract the two squares.</p>')+
sec('06 · WORKED EXAMPLE 1','(x+3)²','<p>(x+3)(x+3)=x²+3x+3x+9=<b>x²+6x+9</b>. At x=2, both expressions equal 25.</p>')+
sec('07 · WORKED EXAMPLE 2','(2x−5)²','<p>(2x)²−2(2x)(5)+5²=<b>4x²−20x+25</b>. At x=1, both expressions equal 9.</p>')+
sec('08 · WORKED EXAMPLE 3','(3x+4)(3x−4)','<p>(3x)²−4²=<b>9x²−16</b>. FOIL verifies: 9x²−12x+12x−16.</p>')+
sec('09 · WORKED EXAMPLE 4','Recognize a square','<p>16x²−40x+25=(4x)²−2(4x)(5)+5²=<b>(4x−5)²</b>.</p>')+
sec('10 · WORKED EXAMPLE 5','Area application','<p>A square with side x+5 has area (x+5)²=<b>x²+10x+25</b> square units.</p>')+
sec('11 · COMMON MISTAKES','Signs and cross-products','<p>(a+b)² is not a²+b². The last term of (a−b)² is positive. Difference of squares requires conjugates.</p>')+
sec('12 · EXAM STRATEGY','Recognize before multiplying','<p>Check for matching binomials or a plus-minus pair. If neither applies, distribute every term and combine like terms.</p>')+
sec('13 · QUICK CHECK','Try three examples','<p>(x−4)²; (2x+3)(2x−3); x²+12x+36 as a square.</p><details><summary>Reveal answers</summary><p>x²−8x+16; 4x²−9; (x+6)².</p></details>')+
sec('14 · LESSON RECAP','Three patterns','<p>Binomial squares have a middle term of twice the product. Conjugates cancel their middle terms.</p>')+
sec('15 · NEXT STEP','Continue learning','<p><a href="../problems/">Practice</a> · <a href="../answers/">Answers</a> · <a href="../test/">Test</a> · <a href="../video/english/">English video</a></p>');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
let practice='<p>Exactly 18 problems. Check feedback does not reveal worked solutions.</p>',answers='<p>Each solution matches its numbered Practice Problem.</p>';
groups.forEach((g,j)=>{practice+='<h2>'+['01 · SKILL CHECK','02 · CORE PRACTICE','03 · EXAM-STYLE PRACTICE','04 · CHALLENGE PROBLEMS'][j]+'</h2>';answers+='<h2>'+g+'</h2>';P.forEach((p,i)=>{if(p[0]!==g)return;practice+='<div class="w5-q" data-answer="'+esc(p[2])+'"><p><b>'+(i+1)+'.</b> '+esc(p[1])+'</p><input type="text" aria-label="Answer '+(i+1)+'"> <button type="button" class="w5-check">Check</button> <span role="status"></span></div>';answers+='<div class="w5-answer"><h3>'+(i+1)+'. '+esc(p[1])+'</h3><p><b>Answer: '+esc(p[2])+'</b></p><p>'+esc(p[3])+'</p></div>';})});
const practiceJS='<script>(()=>{const n=s=>s.toLowerCase().replace(/\\s+/g,"").replace(/[−–]/g,"-").replace(/\\^2/g,"²");document.querySelectorAll(".w5-check").forEach(b=>b.onclick=()=>{let q=b.closest(".w5-q");q.querySelector("[role=status]").textContent=n(q.querySelector("input").value)===n(q.dataset.answer)?"Correct ✓":"Try again: check the pattern and signs.";})})();</script>';
const distractors=[
['x^2+12x+36','x^2+36','x^2+6x+36','x^2-12x+36'],
['4x^2-20x+25','4x^2+20x+25','4x^2-10x+25','4x^2-25'],
['9x^2-4','9x^2+4','9x^2-12x-4','6x^2-4'],
['(5x+3)^2','(5x-3)^2','(25x+3)^2','(5x+9)^2'],
['3','-3','6','9']];
const fmt=s=>s.replace(/\\^2/g,'²').replace(/-/g,'−');
let test='<p>Choose all five answers, then submit once. No correctness is shown before submission.</p><form id="w5-test">';
T.forEach((q,i)=>{test+='<fieldset class="w5-q"><legend><b>'+(i+1)+'. '+esc(q[1])+'</b> ('+esc(q[0])+')</legend>';distractors[i].forEach((d,j)=>test+='<label style="display:block;padding:8px"><input type="radio" required name="q'+i+'" value="'+j+'"> '+esc(fmt(d))+'</label>');test+='</fieldset>';});
test+='<button type="submit" id="submit">Submit Test</button></form><div id="w5-result" hidden></div>';
const testJS='<script>(()=>{const f=document.querySelector("#w5-test"),r=document.querySelector("#w5-result"),sol='+JSON.stringify(T.map(q=>q[2]))+';f.onsubmit=e=>{e.preventDefault();let s=0,review="";for(let i=0;i<5;i++){const v=Number(f.querySelector("input[name=q"+i+"]:checked").value);if(v===0)s++;review+="<p>Question "+(i+1)+": "+(v===0?"Correct":"Incorrect")+". Correct answer: "+sol[i]+"</p>"}r.innerHTML="<h2>Score: "+s+"/5</h2>"+review;r.hidden=false;f.querySelectorAll("input,button").forEach(x=>x.disabled=true)}})();</script>';
const video='<p>Complete English lesson · 16:9 · binomial squares, conjugates, worked examples, common mistakes, and exam strategy.</p><div class="w5-video"><iframe src="'+url+'" title="Special Polynomial Products — full English lesson" loading="eager" allow="autoplay; fullscreen" allowfullscreen></iframe></div><p><a href="'+url+'" target="_blank" rel="noopener">Open full-screen lesson ↗</a></p>';
const routes=[['explanation',shell('Explanation',explanation)],['problems',shell('Problems',practice,practiceJS)],['answers',shell('Answers',answers)],['test',shell('Lesson Test',test,testJS)],['video/english',shell('Video Explanation · English',video)],['video/arabic',shell('Video Explanation · Arabic','<p>Arabic video is pending. <a href="../english/">Watch the complete English video.</a></p>')]];
for(const [r,html] of routes){const d=path.join(dir,r);fs.mkdirSync(d,{recursive:true});fs.writeFileSync(path.join(d,'index.html'),html)}
console.log('Worker 5 lesson 65 complete: 18/18/5, explanation, 16:9 video and both video routes');
