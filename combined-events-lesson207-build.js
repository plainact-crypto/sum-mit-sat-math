const fs=require('fs'),path=require('path');
const d=JSON.parse(fs.readFileSync(path.join(__dirname,'combined-events-lesson207-data.json'),'utf8'));
const base=path.join(__dirname,'dist',d.base.slice(1));
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const write=(route,body)=>{const p=path.join(base,route);fs.mkdirSync(p,{recursive:true});fs.writeFileSync(path.join(p,'index.html'),'<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><title>Combined Events — SUMMIT</title></head><body><header class="topbar"><a class="brand" href="/">SUMMIT SAT MATH</a></header><main class="page-shell"><section class="lesson-card"><div class="crumb">Problem-Solving and Data Analysis · Probability</div><h1>Combined Events</h1>'+body+'</section></main></body></html>')};
const links='<p><a href="../explanation/">Explanation</a> · <a href="../problems/">Practice</a> · <a href="../answers/">Answers</a> · <a href="../test/">Test</a> · <a href="../video/english/">English</a> · <a href="../video/arabic/">Arabic</a></p>';
if(d.slug!=='combined-events'||d.classification!=='NEITHER'||d.practice.length!==18||d.test.length!==5)throw Error('Lesson content invalid');
if(['Skill Check','Core Practice','Exam-Style','Challenge'].map(g=>d.practice.filter(q=>q.group===g).length).join()!=='3,8,5,2')throw Error('Practice groups invalid');
if(d.practice.some((q,i)=>q.number!==i+1||!q.solution||!q.answer))throw Error('Practice alignment invalid');
write('explanation','<!-- SUMMIT_RETROFIT:combined-events:NEITHER -->'+d.explanation.map(x=>'<section class="lesson-section"><h2>'+esc(x.heading)+'</h2><p>'+esc(x.text)+'</p></section>').join('')+links);
for(const mode of ['problems','answers']){
const h=['Skill Check','Core Practice','Exam-Style','Challenge'].map(g=>'<h2>'+esc(g)+'</h2>'+d.practice.filter(q=>q.group===g).map(q=>'<div class="'+(mode==='problems'?'question':'solution')+'"><h3>'+q.number+'. '+esc(q.question)+'</h3>'+(mode==='answers'?'<p><b>'+esc(q.answer)+'</b> — '+esc(q.solution)+'</p>':'')+'</div>').join('')).join('');
write(mode,h+links);
}
const t=d.test.map((q,i)=>'<section class="lesson-test-question" data-answer="'+q.correct+'" data-explain="'+esc(q.solution)+'"><h3>'+q.number+'. '+esc(q.difficulty)+'</h3><p>'+esc(q.question)+'</p>'+q.choices.map((v,j)=>'<label><input type="radio" name="q'+i+'" value="'+j+'">'+esc(v)+'</label><br>').join('')+'</section>').join('');
write('test','<h2>Five progressive questions</h2>'+t+'<button id="submitTest">Submit Test</button><pre id="result"></pre>'+links+'<script src="/combined-events-lesson207-test.js"></script>');
for(const lang of ['english','arabic']){
if(d.video[lang].length!==12)throw Error('Missing bilingual scenes');
const h=d.video[lang].map((s,i)=>'<section class="lesson-scene"><h2>Scene '+(i+1)+': '+esc(s.title)+'</h2><p>'+esc(s.narration)+'</p><p>'+esc(s.math)+'</p></section>').join('');
write('video/'+lang,'<h2>Full lesson — '+lang+'</h2>'+h+'<p><a href="../../explanation/">Explanation</a> · <a href="../../problems/">Practice</a> · <a href="../../answers/">Answers</a> · <a href="../../test/">Test</a></p>');
}
for(const route of ['explanation','problems','answers','test','video/english','video/arabic']){
const html=fs.readFileSync(path.join(base,route,'index.html'),'utf8');
if(html.length<900||/COMING SOON|Content still being completed/i.test(html))throw Error('Invalid route '+route);
}
console.log('Lesson 207: six canonical routes generated');
