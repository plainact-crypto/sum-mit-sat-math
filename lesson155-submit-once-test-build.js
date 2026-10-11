const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'dist/advanced-math/nonlinear-functions/converting-between-representations/test/index.html');
const questions=[
{q:'For y=2x²−3, what is y when x=2?',o:['1','5','8','13'],a:1,why:'2(2²)−3=5.'},
{q:'A table contains (0,4), (1,8), (2,16). Which exponential rule matches?',o:['y=4+x','y=2·4^x','y=4·2^x','y=8·2^x'],a:2,why:'At x=0 the value is 4 and each step doubles.'},
{q:'A parabola has vertex (−1,2) and passes through (0,5). Choose its equation.',o:['y=3(x−1)²+2','y=3(x+1)²+2','y=(x+1)²+2','y=3(x+1)²−2'],a:1,why:'Vertex form y=a(x+1)²+2 and 5=a+2, so a=3.'},
{q:'A quadratic has zeros −2 and 4 and y-intercept 16. Choose its equation.',o:['y=2(x+2)(x−4)','y=−(x+2)(x−4)','y=−2(x+2)(x−4)','y=−2(x−2)(x+4)'],a:2,why:'At x=0, 16=a(2)(−4)=−8a, so a=−2.'},
{q:'An exponential function passes through (2,18) and (4,162), with positive base. Find y=ab^x.',o:['y=3·2^x','y=2·9^x','y=6·3^x','y=2·3^x'],a:3,why:'Divide to obtain b²=9, hence b=3; 18=9a gives a=2.'}
];
let html=fs.readFileSync(file,'utf8');
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const body='<h2>Lesson Test — five progressive questions</h2><p>Submit once after answering all five. No answers are revealed before submission.</p>'+questions.map((q,i)=>'<section class="lesson-section" data-test="'+i+'"><h3>'+['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'][i]+' — '+(i+1)+'</h3><p>'+esc(q.q)+'</p>'+q.o.map((o,j)=>'<label style="display:block"><input type="radio" name="q'+i+'" value="'+j+'"> '+esc(o)+'</label>').join('')+'<p class="review" hidden></p></section>').join('')+'<button id="submitLessonTest" type="button">Submit Test</button><p id="lessonScore" aria-live="polite"></p>';
const script='<script>const key='+JSON.stringify(questions.map(q=>q.a))+';const why='+JSON.stringify(questions.map(q=>q.why))+';let submitted=false;document.getElementById("submitLessonTest").onclick=()=>{if(submitted)return;const sections=[...document.querySelectorAll("[data-test]")];if(sections.some(s=>!s.querySelector("input:checked"))){document.getElementById("lessonScore").textContent="Answer all five questions first.";return}submitted=true;let score=0;sections.forEach((s,i)=>{const selected=Number(s.querySelector("input:checked").value);if(selected===key[i])score++;s.querySelectorAll("input").forEach(input=>input.disabled=true);const review=s.querySelector(".review");review.hidden=false;review.textContent=(selected===key[i]?"Correct. ":"Incorrect. ")+"Correct answer: "+s.querySelectorAll("label")[key[i]].textContent.trim()+". "+why[i]});document.getElementById("submitLessonTest").disabled=true;document.getElementById("lessonScore").textContent="Final result: "+score+"/5"};</script>';
html=html.replace(/<article class="lesson-content">[\s\S]*?<\/article>/,'<article class="lesson-content">'+body+'</article>').replace('</body>',script+'</body>');
fs.writeFileSync(file,html);
if(questions.length!==5||!html.includes('let submitted=false'))throw Error('Lesson155 test QA failed');
console.log('Lesson155 progressive test: five questions, final submit once.');
