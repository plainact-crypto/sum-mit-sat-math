'use strict';
const fs=require('fs'),path=require('path');
const slug='composite-solids',title='Composite Solids',base='/geometry-and-trigonometry/volume-and-surface-area/'+slug;
const read=n=>JSON.parse(fs.readFileSync(path.join(__dirname,'composite-solids-lesson257-'+n+'.json'),'utf8'));
const explanation=read('explanation'),practice=[...read('practice-a'),...read('practice-b'),...read('practice-c')],test=read('test');
const groups=['Skill Check','Core Practice','Exam-Style','Challenge'];
const esc=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const dest=r=>path.join(__dirname,'dist',base.slice(1),r,'index.html');
const links='<nav class="lesson-links"><a href="../explanation/">Explanation</a> · <a href="../problems/">Practice</a> · <a href="../answers/">Answers</a> · <a href="../test/">Test</a> · <a href="../video/english/">English lesson</a> · <a href="../video/arabic/">Arabic lesson</a></nav>';
function page(type,html){const nav=type==='Explanation'?links:links;return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>'+title+' — '+type+' | SUMMIT</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a></header><main class="page-shell"><article class="lesson-content lesson-card"><div class="crumb">Geometry and Trigonometry · Volume and Surface Area</div><div class="page-type">'+type+'</div><div class="lesson-title">'+title+'</div><h1>'+title+' — '+type+'</h1>'+html+nav+'</article></main></body></html>';}
function write(route,html){const file=dest(route);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);}
function assert(ok,msg){if(!ok)throw Error('Lesson 257 QA: '+msg);}
assert(explanation.length>=13&&explanation.filter(x=>x.heading.startsWith('WORKED EXAMPLE')).length>=3,'explanation sections');
assert(practice.length===18&&test.length===5,'counts');
assert(groups.map(g=>practice.filter(q=>q.group===g).length).join(',')==='3,8,5,2','groups');
assert(practice.every((q,i)=>q.number===i+1&&q.question&&q.answer&&q.solution),'practice alignment');
assert(new Set(practice.map(q=>q.question)).size===18,'duplicate practice');
assert(test.every((q,i)=>q.number===i+1&&q.choices.length===4&&q.correct>=0&&q.correct<4&&q.solution),'test alignment');
for(const q of [...practice,...test]){const actual=Function('return ('+q.qaExpr+')')();assert(Number.isFinite(actual)&&Math.abs(actual-q.qaValue)<1e-8,'math '+q.number);}
const e=explanation.map(x=>'<section class="lesson-section"><h2>'+esc(x.heading)+'</h2><p>'+esc(x.text)+'</p></section>').join('');
write('explanation','<!-- SUMMIT_RETROFIT:composite-solids:NEITHER -->'+page('Explanation',e));
function questions(mode){return groups.map(g=>'<section class="lesson-section"><h2>'+esc(g)+'</h2>'+practice.filter(q=>q.group===g).map(q=>'<div class="'+(mode==='Answers & Solutions'?'solution':'question')+'"><h3>Question '+q.number+'</h3><p>'+esc(q.question)+'</p>'+(mode==='Answers & Solutions'?'<p><strong>Answer: '+esc(q.answer)+'</strong></p><p>'+esc(q.solution)+'</p>':'')+'</div>').join('')+'</section>').join('');}
write('problems',page('Practice Problems','<p>18 questions · 3 Skill Check · 8 Core · 5 Exam-Style · 2 Challenge. Full worked solutions appear only on the Answers page.</p>'+questions('Practice Problems')));
write('answers',page('Answers & Solutions',questions('Answers & Solutions')));
const testHtml=test.map((q,i)=>'<fieldset class="lesson-test-question"><legend>Question '+q.number+' — '+esc(q.difficulty)+'</legend><p>'+esc(q.question)+'</p>'+q.choices.map((c,j)=>'<label style="display:block"><input type="radio" name="q'+i+'" value="'+j+'"> '+esc(c)+'</label>').join('')+'</fieldset>').join('');
const correct=JSON.stringify(test.map(q=>q.correct)),reviews=JSON.stringify(test.map(q=>q.solution));
const script='<script>(()=>{const key='+correct+',review='+reviews+';let done=false;document.getElementById("submitTest").addEventListener("click",()=>{if(done)return;done=true;let score=0;const detail=[];for(let i=0;i<key.length;i++){const checked=document.querySelector("input[name=q"+i+"]:checked");const chosen=checked?Number(checked.value):-1;if(chosen===key[i])score++;detail.push("<p>Question "+(i+1)+": "+(chosen===key[i]?"Correct":"Incorrect or unanswered")+". "+review[i]+"</p>");}document.querySelectorAll("input").forEach(x=>x.disabled=true);document.getElementById("submitTest").disabled=true;document.getElementById("result").innerHTML="<h2>Final score: "+score+"/5</h2>"+detail.join("");});})();</script>';
write('test',page('Lesson Test','<p>Five progressively harder questions. No correctness feedback is shown until you submit once.</p>'+testHtml+'<button id="submitTest" type="button">Submit Test</button><div id="result" aria-live="polite"></div>'+script));
for(const route of ['explanation','problems','answers','test']){const h=fs.readFileSync(dest(route),'utf8');assert(h.length>1300&&!/COMING SOON|Content still being completed/i.test(h),'route '+route);}
console.log('Composite Solids lesson 257: four core pages; 18 aligned solutions and 5 graded tests; 23 math checks PASS.');
