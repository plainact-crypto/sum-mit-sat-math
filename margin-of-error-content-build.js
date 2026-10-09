/* SUMMIT #215 — Margin of Error. Worker 5. Six routes; no shorts. */
const fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=__dirname,slug='margin-of-error',title='Margin of Error';
const curriculum=JSON.parse(zlib.gunzipSync(Buffer.from(fs.readFileSync(path.join(root,'curriculum.json.gz.b64'),'utf8').trim(),'base64')).toString('utf8'));
const leaves=[];for(const s of curriculum)for(const sec of s.sections||[]){for(const l of sec.leaves||[])leaves.push(l);for(const g of sec.groups||[])for(const l of g.leaves||[])leaves.push(l);}
if(leaves.length!==298||leaves[214].title!==title)throw Error('Canonical #215 mismatch');
const base=leaves[214].base.replace(/^\/|\/$/g,'');
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Each record: question, correct answer, three distinct distractors, worked reasoning.
const p=[
['A survey estimates 58% support with a margin of error of 4 percentage points. What is the lower endpoint?','54%',['62%','4%','56%'],'Subtract four percentage points from fifty-eight: 58 − 4 = 54%. This is an absolute difference in percentage points, not four percent of 58%.'],
['A poll reports 42% support with a margin of error of 3 percentage points. What is the upper endpoint?','45%',['39%','42.3%','126%'],'Add the three percentage points to the estimate: 42 + 3 = 45%. Do not multiply the estimate by 1.03.'],
['A reported estimate is 65% plus or minus 5 percentage points. Which interval is described?','60% to 70%',['65% to 75%','5% to 65%','60% to 65%'],'The lower endpoint is 65 − 5 = 60%; the upper endpoint is 65 + 5 = 70%. The estimate is the midpoint.'],
['A sample estimates 31% with a margin of 6 percentage points. What is the total interval width?','12 percentage points',['6 percentage points','25 percentage points','37 percentage points'],'The endpoints are 25% and 37%. Subtract 37 − 25 = 12 percentage points, which is twice the margin.'],
['A symmetric interval extends from 47% to 55%. What is its point estimate?','51%',['47%','55%','8%'],'The center of a symmetric interval is the midpoint: (47 + 55)/2 = 51%.'],
['A symmetric interval extends from 47% to 55%. What is the margin of error in percentage points?','4',['8','51','2'],'The interval width is 55 − 47 = 8 percentage points; half the width is 4.'],
['An estimate is 73% plus or minus 8 points. Which percentage lies outside its interval?','82%',['65%','70%','80%'],'The endpoints are 73 − 8 = 65% and 73 + 8 = 81%. Only 82% lies outside the interval.'],
['A poll reports 49% plus or minus 4 points. Does its interval include 50%?','Yes, 50% is inside',['No, 50% is above it','No, 50% is below it','Only if the sample is biased'],'The interval extends from 45% to 53%, and 50% lies between these endpoints. The estimate alone does not rule out majority support.'],
['Poll A has 400 random respondents and margin 6 points. Poll B has 1600 under comparable conditions. What is B’s approximate margin?','3',['12','1.5','6'],'Margin scales approximately as 1/√n. Four times the sample size halves the margin: 6/2 = 3 points.'],
['A random sample of 900 gives margin 4 points. Roughly how many comparable respondents are needed to halve the margin?','3600',['1800','900','1200'],'Halving a margin requires quadrupling the sample size: 900 × 4 = 3600 respondents.'],
['Two independent polls have the same method and confidence level. Which typically has a smaller sampling margin?','The poll with 1,000 random respondents',['The poll with 100 random respondents','Both always have equal margins','The poll with more volunteers'],'A larger comparable random sample typically reduces sampling variability. Random selection matters; adding volunteers can introduce bias.'],
['A school estimates 62% favor a change, margin 7 points. What count corresponds to the lower endpoint among 2,000 students?','1100',['1240','1380','140'],'The lower endpoint is 62 − 7 = 55%; 0.55 × 2000 = 1100. This is an interval-based estimate, not an exact census.'],
['Candidate A polls 51% ± 4 points; B polls 47% ± 4 points. What is the safest conclusion from the intervals alone?','The intervals overlap; the lead is not established by these margins alone',['A must win','B must win','The true difference is exactly 4 points'],'A spans 47%–55% and B spans 43%–51%. These intervals overlap, so the reported margins alone do not establish a decisive lead.'],
['A sample proportion is 0.36 with margin 0.05. What is the upper endpoint as a decimal?','0.41',['0.31','0.405','0.86'],'Add the decimal margin: 0.36 + 0.05 = 0.41. The lower endpoint is 0.31.'],
['A sample of 625 has margin 4 points. What is the approximate margin for a comparable sample of 2500?','2',['1','8','16'],'The sample size quadruples from 625 to 2500, so the square-root rule halves the margin from 4 to 2 points.'],
['A voluntary website poll reports a 2-point margin. Which problem is NOT corrected by that margin?','Selection bias from voluntary response',['Rounding the percentage','The interval’s numerical endpoints','Writing the estimate as a decimal'],'A margin measures sampling uncertainty under suitable assumptions. Voluntary participation may create selection bias that no reported margin repairs.'],
['A sample of 144 has margin 9 points. Under square-root scaling, what sample size targets a 3-point margin?','1296',['432','576','48'],'Cutting the margin by three requires multiplying the sample by nine: 144 × 9 = 1296.'],
['A symmetric interval is [0.28, 0.44]. What is the ratio of its margin to its point estimate?','2/9',['4/9','1/6','1/9'],'The midpoint is 0.36, the margin is 0.08, and 0.08/0.36 = 8/36 = 2/9.']
];
const t=[
['A poll reports 60% plus or minus 2 points. What is its lower endpoint?','58%',['62%','30%','60.2%'],'Subtract two points from sixty: 60 − 2 = 58%.'],
['An interval runs from 32% to 44%. What is the margin in percentage points?','6',['12','38','3'],'The width is 44 − 32 = 12, so the margin is half the width: 6.'],
['A sample of 225 has margin 8 points. What is the approximate margin for a comparable sample of 900?','4',['2','16','32'],'Four times the sample size halves the margin: 8/2 = 4.'],
['A survey estimates 46% plus or minus 5 points. Which statement follows from its interval alone?','A population value of 50% is consistent with the interval',['The population proportion must equal 46%','The population proportion must be below 50%','The poll proves 54% oppose'],'The interval is 41% to 51%, which includes 50%. It does not guarantee the true population value.'],
['A poll has a 6-point margin with sample size 400. What size targets a 2-point margin under comparable conditions?','3600',['1200','800','1800'],'Dividing the margin by three requires multiplying the sample by nine: 400 × 9 = 3600.']
];
const sec=[
['LESSON OBJECTIVE','Interpret uncertainty','Compute interval endpoints, compare margins, and explain what a margin of error can and cannot tell you.'],
['CORE IDEA','Samples vary','A sample estimate differs from the population value because a random sample is only part of the population.'],
['KEY DEFINITIONS','Three useful terms','Point estimate: sample-based center. Margin: plus-or-minus distance. Interval: the span around the center.'],
['CORE RULE','Estimate ± margin','Lower endpoint = estimate − margin. Upper endpoint = estimate + margin.'],
['HOW IT WORKS','Use percentage points','57% ± 4 points means 53% through 61%, not a four-percent relative increase or decrease.'],
['WORKED EXAMPLE 1','Find endpoints','For 64% ± 5 points, lower = 64 − 5 = 59%; upper = 64 + 5 = 69%.'],
['WORKED EXAMPLE 2','Find the midpoint','For an interval [41%,53%], center = (41+53)/2 = 47%.'],
['WORKED EXAMPLE 3','Find the margin','For [41%,53%], width = 12 points and margin = 12/2 = 6 points.'],
['WORKED EXAMPLE 4','Does 50% fit?','48% ± 3 points gives [45%,51%]. Because 50% is inside, the poll does not rule out majority support.'],
['WORKED EXAMPLE 5','Convert to a count','58% ± 6 points has a 52% lower endpoint. In a population of 1500, 0.52 × 1500 = 780.'],
['SAMPLE SIZE','The square-root rule','For comparable random samples at the same confidence level, margin is approximately proportional to 1/√n.'],
['WORKED EXAMPLE 6','Reduce the margin','To reduce 6 points to 3, multiply the sample size by four; to reduce 6 to 2, multiply it by nine.'],
['LIMITATIONS','Bias is different','A sampling margin does not repair undercoverage, nonresponse, or voluntary-response selection bias.'],
['COMMON MISTAKES','Avoid false certainty','Do not confuse margin with interval width; do not confuse percentage points with relative percentages; do not claim certainty.'],
['EXAM STRATEGY','Read the target','For endpoints, add or subtract; for center, average; for margin, halve the width; for sample size, square the margin ratio.'],
['QUICK CHECK','Try two checks','70% ± 8 gives [62%,78%]. Quadrupling a comparable sample with margin 5 points gives approximately 2.5 points.'],
['LESSON RECAP','Keep the relationships','Center ± margin; width = 2 × margin; margin ∝ 1/√n; sampling error is not systematic bias.'],
['NEXT STEP','Practice and test','Solve all 18 Practice Problems, read 18 aligned Answers, and submit the five-question Lesson Test.']
];
const scenes=[
['Introduction','What does a margin of error mean?','Estimate ± margin'],
['Point estimate','The center is a sample estimate.','57 percent'],
['Build an interval','Subtract and add percentage points.','57 ± 4 → 53 to 61'],
['Percentage points','A four-point margin is not a relative four-percent change.','57 − 4 = 53'],
['Recover a center','Average two endpoints.','(41 + 53)/2 = 47'],
['Recover a margin','Halve the interval width.','(53 − 41)/2 = 6'],
['Majority threshold','Check whether 50 percent lies in the interval.','48 ± 3 → 45 to 51'],
['Sample size','Margins shrink approximately as 1 over square root n.','margin ∝ 1/√n'],
['Quadruple n','Four times the sample roughly halves the margin.','n × 4 → margin / 2'],
['Multiply n by nine','Nine times the sample cuts the margin to one third.','n × 9 → margin / 3'],
['Interpret counts','Multiply a proportion endpoint by the population.','0.52 × 1500 = 780'],
['Sampling bias','A margin cannot correct voluntary-response bias.','Bias ≠ sampling error'],
['Avoid certainty','Confidence intervals are not guarantees.','Interval ≠ certainty'],
['SAT strategy','Identify the quantity the question asks for.','Center, margin, width, n'],
['Next step','Practice eighteen questions, then take the five-question test.','18 Practice + 5 Test']
];
if(p.length!==18||t.length!==5||sec.length<13||scenes.length<12)throw Error('lesson package count mismatch');
const esc=E,groups=['SKILL CHECK','CORE PRACTICE','EXAM-STYLE PRACTICE','CHALLENGE PROBLEMS'];
const groupOf=i=>i<3?0:i<11?1:i<16?2:3;
function opts(q,i,prefix){const values=[q[1],...q[2]],rot=(i*3+1)%4,order=values.slice(rot).concat(values.slice(0,rot));return {correct:order.indexOf(q[1]),html:'<div class="choices">'+order.map((v,j)=>'<label><input type="radio" name="'+prefix+i+'" value="'+j+'"><span><b>'+String.fromCharCode(65+j)+'.</b> '+esc(v)+'</span></label>').join('')+'</div>'};}
const style='<style>.lesson-content{line-height:1.7;color:#20354d}.lesson-content section{margin:16px 0;padding:20px;border:1px solid #dce6f0;border-radius:15px;background:#fff}.lesson-content h2{color:#12304c;font-size:1.27rem}.section-kicker{font-weight:800;color:#12709e}.question{padding:17px;margin:12px 0;border:1px solid #d5e3ed;border-radius:12px;background:#f7fafc}.choices{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}.choices label{display:flex;gap:8px;align-items:center;padding:11px;background:white;border:1px solid #c4d6e5;border-radius:10px}.question button,#submitTest,.video-controls button{background:#0678aa;color:white;border:0;border-radius:9px;padding:11px 18px;cursor:pointer}.solution{padding:16px;border-bottom:1px solid #dbe5ee}.summit-full-lesson-player{padding:24px;background:#10233f;color:white;border-radius:16px}.summit-stage{min-height:290px;aspect-ratio:16/9;display:flex;flex-direction:column;justify-content:center;gap:12px}.summit-stage h2{color:white}.summit-stage code{font-size:1.35rem;color:#a8eaff}.video-controls{display:flex;gap:12px;flex-wrap:wrap}@media(max-width:640px){.choices{grid-template-columns:1fr}}</style>';
function shell(kind,route,body){const pre=route.startsWith('video/')?'../../':'../';const nav='<nav class="lesson-nav">'+[['explanation','Explanation'],['problems','Practice Problems'],['answers','Answers & Solutions'],['test','Lesson Test'],['video/english','English Video']].map(a=>'<a href="'+pre+a[0]+'/">'+a[1]+'</a>').join(' · ')+'</nav>';return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+title+' — '+kind+' | SUMMIT SAT MATH</title>'+style+'</head><body><header class="topbar"><a class="brand" href="/"><span class="brand-copy">SUMMIT<small>SAT MATH</small></span></a><nav><a href="/">Home</a><a href="/#subjects">Subjects</a><a href="/#subjects">Practice</a></nav></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem Solving and Data Analysis · Sampling and Inference</div><div class="page-type">'+kind+'</div><div class="lesson-title">'+title+'</div><article class="lesson-content">'+body+'</article>'+nav+'</section></main></body></html>';}
let ex='<!-- SUMMIT_RETROFIT:margin-of-error:NEITHER -->';sec.forEach((s,i)=>ex+='<section data-section="'+(i+1)+'"><span class="section-kicker">'+(i+1)+' · '+esc(s[0])+'</span><h2>'+esc(s[1])+'</h2><p>'+esc(s[2])+'</p></section>');
let problems='<p>Answer 18 original questions. Practice reveals correctness, not full worked solutions.</p>',answers='<p>All 18 worked solutions match Practice Questions 1–18.</p>';
groups.forEach((g,j)=>{problems+='<section><h2>'+g+'</h2>';answers+='<section><h2>'+g+'</h2>';p.forEach((q,k)=>{if(groupOf(k)!==j)return;const i=k+1,o=opts(q,i,'p');problems+='<div class="question" id="pq'+i+'" data-correct="'+o.correct+'"><h3>'+i+'. '+esc(q[0])+'</h3>'+o.html+'<button type="button" onclick="checkPractice('+i+')">Check Answer</button><p id="pf'+i+'" aria-live="polite"></p></div>';answers+='<div class="solution" data-practice-id="'+i+'"><h3>'+i+'. '+esc(q[0])+'</h3><p><b>Reasoning:</b> '+esc(q[3])+'</p><p><b>Answer:</b> '+esc(q[1])+'</p></div>';});problems+='</section>';answers+='</section>';});
problems+='<script>function checkPractice(i){const q=document.getElementById("pq"+i),a=q.querySelector("input:checked"),f=document.getElementById("pf"+i);f.textContent=!a?"Choose an option first.":Number(a.value)===Number(q.dataset.correct)?"Correct.":"Not yet. Recheck the interval or sample-size relationship.";}</script>';
let test='<p>Submit all five questions at the end. No correctness feedback appears before submission.</p><form id="lessonTest">';const correct=[],labels=[],reasons=[];
t.forEach((q,k)=>{const i=k+1,o=opts(q,i,'t');correct.push(o.correct);labels.push(q[1]);reasons.push(q[3]);test+='<section><span class="section-kicker">'+['Easy','Easy / Medium','Medium','Medium / Hard','Hard / Exam-Style'][k]+'</span><div class="question"><h3>'+i+'. '+esc(q[0])+'</h3>'+o.html+'</div></section>';});
test+='</form><button id="submitTest" type="submit" form="lessonTest">Submit Test</button><div id="result" hidden aria-live="polite"></div>';
test+='<script>const correct='+JSON.stringify(correct)+',labels='+JSON.stringify(labels)+',reasons='+JSON.stringify(reasons)+';document.getElementById("lessonTest").addEventListener("submit",e=>{e.preventDefault();let score=0,lines=[];for(let i=0;i<5;i++){const a=document.querySelector("input[name=t"+(i+1)+"]:checked"),ok=a&&Number(a.value)===correct[i];if(ok)score++;lines.push("<li>"+(ok?"Correct":"Review")+": "+labels[i]+" — "+reasons[i]+"</li>");}const r=document.getElementById("result");r.hidden=false;r.innerHTML="<h2>Final score: "+score+"/5</h2><ol>"+lines.join("")+"</ol>";document.getElementById("submitTest").disabled=true;document.querySelectorAll("#lessonTest input").forEach(x=>x.disabled=true);});</script>';
let video='<p>Full 16:9 interactive narrated lesson with fifteen instructional scenes. Use Play Narration to hear the entire lesson in English.</p><div class="summit-full-lesson-player"><div class="summit-stage"><small>SUMMIT SAT MATH · FULL LESSON · 16:9</small><h2 id="vtitle"></h2><p id="vbody"></p><code id="vformula"></code><small id="vprogress"></small></div><div class="video-controls"><button id="vplay">Play Narration</button><button id="vpause">Pause</button><button id="vnext">Next Scene</button></div></div>';
video+='<script>const scenes='+JSON.stringify(scenes)+';let n=0,playing=false;function show(){let s=scenes[n];document.getElementById("vtitle").textContent=s[0];document.getElementById("vbody").textContent=s[1];document.getElementById("vformula").textContent=s[2];document.getElementById("vprogress").textContent=(n+1)+" / "+scenes.length;}function speak(){if(!playing||!("speechSynthesis" in window))return;speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(scenes[n][1]+". "+scenes[n][2]);u.lang="en-US";u.rate=.88;u.onend=()=>{if(playing&&n<scenes.length-1){n++;show();speak();}else playing=false;};speechSynthesis.speak(u);}document.getElementById("vplay").onclick=()=>{playing=true;speak();};document.getElementById("vpause").onclick=()=>{playing=false;if("speechSynthesis" in window)speechSynthesis.cancel();};document.getElementById("vnext").onclick=()=>{n=(n+1)%scenes.length;show();if(playing)speak();};show();</script>';
const arabic='<section><h2>Arabic narration pending</h2><p>Full English lesson is available; an Arabic dub has not been produced.</p><a href="../english/">Watch English lesson</a></section>';
const pages={'explanation':shell('Explanation','explanation',ex),'problems':shell('Practice Problems','problems',problems),'answers':shell('Answers & Solutions','answers',answers),'test':shell('Lesson Test','test',test),'video/english':shell('Full English Video','video/english',video),'video/arabic':shell('Arabic Video','video/arabic',arabic)};
for(const [route,html] of Object.entries(pages)){const dir=path.join(root,'dist',base,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);}
console.log('[SUMMIT #215] '+Object.keys(pages).length+' routes installed at '+base+'; 18 practice, 18 answers, 5 test, 15 full-video scenes; no shorts');
